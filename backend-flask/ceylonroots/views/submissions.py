"""
JSON-driven form submission engine.
Reads submissions.json to render and validate public forms.
"""

import json
import os
from functools import lru_cache

from flask import (
    Blueprint,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import Submission, SubmissionStatus

submissions_bp = Blueprint("submissions", __name__)

SUBMISSIONS_JSON = os.path.join(
    os.path.dirname(__file__), "..", "..", "submissions.json"
)


@lru_cache(maxsize=1)
def _load_definitions() -> list[dict]:
    path = os.path.abspath(SUBMISSIONS_JSON)
    with open(path) as f:
        return json.load(f)


def get_definition(code: str) -> dict | None:
    return next((d for d in _load_definitions() if d["code"] == code), None)


def _validate(definition: dict, data: dict) -> list[str]:
    """Return a list of validation error messages."""
    errors = []
    for field in definition.get("fields", []):
        name = field["name"]
        value = data.get(name, "")
        required = field.get("required", False)

        if required and not str(value).strip():
            errors.append(f"{name.replace('_', ' ').title()} is required.")
            continue

        if not value:
            continue

        field_type = field.get("type", "string")

        if field_type == "email":
            from email_validator import EmailNotValidError, validate_email

            try:
                validate_email(str(value))
            except EmailNotValidError:
                errors.append(f"{name}: invalid email address.")

        elif field_type == "phone":
            import phonenumbers

            try:
                parsed = phonenumbers.parse(str(value), None)
                if not phonenumbers.is_valid_number(parsed):
                    errors.append(f"{name}: invalid phone number.")
            except phonenumbers.NumberParseException:
                errors.append(f"{name}: invalid phone number format.")

        elif field_type == "integer":
            try:
                int_val = int(value)
                if "min" in field and int_val < field["min"]:
                    errors.append(f"{name} must be at least {field['min']}.")
                if "max" in field and int_val > field["max"]:
                    errors.append(f"{name} must be at most {field['max']}.")
            except (TypeError, ValueError):
                errors.append(f"{name} must be a number.")

        elif field_type == "choice":
            if value not in field.get("choices", []):
                errors.append(
                    f"{name}: invalid choice. Options: {', '.join(field.get('choices', []))}"
                )

        elif field_type in ("string", "text"):
            if "min" in field and len(str(value)) < field["min"]:
                errors.append(f"{name} must be at least {field['min']} characters.")

    return errors


# ---------------------------------------------------------------------------
# Public routes (forms subdomain / /submit)
# ---------------------------------------------------------------------------


@submissions_bp.get("/submit/<code>")
def show_form(code):
    definition = get_definition(code)
    if not definition:
        return "Form not found.", 404
    return render_template("external/submission_form.html", definition=definition)


@submissions_bp.post("/submit/<code>")
def handle_form(code):
    definition = get_definition(code)
    if not definition:
        return "Form not found.", 404

    data = {
        field["name"]: request.form.get(field["name"], "")
        for field in definition.get("fields", [])
    }
    errors = _validate(definition, data)

    if errors:
        return render_template(
            "external/submission_form.html",
            definition=definition,
            errors=errors,
            data=data,
        )

    submission = Submission(type_code=code, data=data)
    db.session.add(submission)
    db.session.commit()

    if definition.get("notify_admin"):
        try:
            from ceylonroots.utils import send_submission_notification

            send_submission_notification(definition["name"], data)
        except Exception:
            pass

    return render_template("external/submission_success.html", definition=definition)


# ---------------------------------------------------------------------------
# Admin routes
# ---------------------------------------------------------------------------


@submissions_bp.get("/admin/submissions")
@login_required
@require_staff(["submissions.read"])
def list_submissions():
    type_code = request.args.get("type", "")
    status = request.args.get("status", "")
    query = Submission.query
    if type_code:
        query = query.filter_by(type_code=type_code)
    if status:
        query = query.filter_by(status=status)
    items = query.order_by(Submission.created.desc()).all()
    definitions = _load_definitions()
    return render_template(
        "submissions_list.html",
        items=items,
        type_code=type_code,
        status=status,
        definitions=definitions,
        statuses=SubmissionStatus.CHOICES,
    )


@submissions_bp.get("/admin/submissions/<int:id>")
@login_required
@require_staff(["submissions.read"])
def view_submission(id):
    submission = Submission.query.get_or_404(id)
    definition = get_definition(submission.type_code)
    return render_template(
        "submission_detail.html",
        submission=submission,
        definition=definition,
        statuses=SubmissionStatus.CHOICES,
    )


@submissions_bp.post("/admin/submissions/<int:id>/status")
@login_required
@require_staff(["submissions.read"])
def update_submission_status(id):
    submission = Submission.query.get_or_404(id)
    new_status = request.form.get("status")
    if new_status in SubmissionStatus.ALL:
        submission.status = new_status
        submission.notes = request.form.get("notes", submission.notes)
        db.session.commit()
        flash("Status updated.", "success")
    return redirect(url_for("submissions.view_submission", id=id))


# ---------------------------------------------------------------------------
# JSON API endpoint (for the Next.js frontend)
# ---------------------------------------------------------------------------


@submissions_bp.post("/api/submit/<code>")
def api_submit(code):
    definition = get_definition(code)
    if not definition:
        return jsonify({"error": "Form not found"}), 404

    data = request.get_json(force=True) or {}
    errors = _validate(definition, data)

    if errors:
        return jsonify({"errors": errors}), 422

    submission = Submission(type_code=code, data=data)
    db.session.add(submission)
    db.session.commit()

    if definition.get("notify_admin"):
        try:
            from ceylonroots.utils import send_submission_notification

            send_submission_notification(definition["name"], data)
        except Exception:
            pass

    return jsonify({"id": submission.id, "status": "received"}), 201
