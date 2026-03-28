from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import GuideForm
from ..models import Guide
from ..utils import csv_to_list, list_to_csv


guides_bp = Blueprint("guides", __name__, url_prefix="/guides")


@guides_bp.get("/")
@login_required
@admin_required
def list_guides():
    guides = Guide.query.order_by(Guide.featured.desc(), Guide.rating.desc()).all()
    return render_template("guides/list.html", guides=guides)


@guides_bp.route("/new", methods=["GET", "POST"])
@login_required
@admin_required
def new_guide():
    form = GuideForm()
    if form.validate_on_submit():
        guide = Guide(
            name=form.name.data,
            photo=form.photo.data,
            bio=form.bio.data,
            expertise=csv_to_list(form.expertise_csv.data),
            languages=csv_to_list(form.languages_csv.data),
            experience=form.experience.data,
            rating=form.rating.data or 5.0,
            review_count=form.review_count.data or 0,
            response_time=form.response_time.data,
            featured=form.featured.data,
        )
        db.session.add(guide)
        db.session.commit()
        flash("Guide created.", "success")
        return redirect(url_for("guides.list_guides"))
    return render_template("guides/form.html", form=form, guide=None)


@guides_bp.route("/<int:guide_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_guide(guide_id: int):
    guide = Guide.query.get_or_404(guide_id)
    form = GuideForm(obj=guide)
    if request.method == "GET":
        form.expertise_csv.data = list_to_csv(guide.expertise or [])
        form.languages_csv.data = list_to_csv(guide.languages or [])

    if form.validate_on_submit():
        guide.name = form.name.data
        guide.photo = form.photo.data
        guide.bio = form.bio.data
        guide.expertise = csv_to_list(form.expertise_csv.data)
        guide.languages = csv_to_list(form.languages_csv.data)
        guide.experience = form.experience.data
        guide.rating = form.rating.data or 5.0
        guide.review_count = form.review_count.data or 0
        guide.response_time = form.response_time.data
        guide.featured = form.featured.data
        db.session.commit()
        flash("Guide updated.", "success")
        return redirect(url_for("guides.list_guides"))

    return render_template("guides/form.html", form=form, guide=guide)


@guides_bp.post("/<int:guide_id>/delete")
@login_required
@admin_required
def delete_guide(guide_id: int):
    guide = Guide.query.get_or_404(guide_id)
    db.session.delete(guide)
    db.session.commit()
    flash("Guide deleted.", "success")
    return redirect(url_for("guides.list_guides"))
