from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import Guide

guides_bp = Blueprint("guides", __name__)


@guides_bp.get("/guides")
@login_required
@require_staff(["guides.manage"])
def list_guides():
    guides = Guide.query.order_by(Guide.name).all()
    return render_template("guides_list.html", guides=guides)


@guides_bp.get("/guides/create")
@login_required
@require_staff(["guides.manage"])
def create_guide():
    return render_template("guides_form.html", guide=None)


@guides_bp.post("/guides/create")
@login_required
@require_staff(["guides.manage"])
def create_guide_post():
    guide = Guide(
        name=request.form["name"],
        bio=request.form.get("bio"),
        image_url=request.form.get("image_url"),
        experience_years=int(request.form.get("experience_years", 0)),
        expertise=_split_csv(request.form.get("expertise", "")),
        languages=_split_csv(request.form.get("languages", "")),
    )
    db.session.add(guide)
    db.session.commit()
    flash(f'Guide "{guide.name}" created.', "success")
    return redirect(url_for("guides.list_guides"))


@guides_bp.get("/guides/edit/<int:id>")
@login_required
@require_staff(["guides.manage"])
def edit_guide(id):
    guide = Guide.query.get_or_404(id)
    return render_template("guides_form.html", guide=guide)


@guides_bp.post("/guides/edit/<int:id>")
@login_required
@require_staff(["guides.manage"])
def edit_guide_post(id):
    guide = Guide.query.get_or_404(id)
    guide.name = request.form["name"]
    guide.bio = request.form.get("bio")
    guide.image_url = request.form.get("image_url")
    guide.experience_years = int(request.form.get("experience_years", 0))
    guide.expertise = _split_csv(request.form.get("expertise", ""))
    guide.languages = _split_csv(request.form.get("languages", ""))
    guide.active = "active" in request.form
    db.session.commit()
    flash(f'Guide "{guide.name}" updated.', "success")
    return redirect(url_for("guides.list_guides"))


@guides_bp.post("/guides/delete/<int:id>")
@login_required
@require_staff(["guides.manage"])
def delete_guide(id):
    guide = Guide.query.get_or_404(id)
    db.session.delete(guide)
    db.session.commit()
    flash("Guide deleted.", "info")
    return redirect(url_for("guides.list_guides"))


def _split_csv(value: str) -> list[str]:
    return [v.strip() for v in value.split(",") if v.strip()]
