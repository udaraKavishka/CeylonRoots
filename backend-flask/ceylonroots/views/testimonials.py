from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import Testimonial

testimonials_bp = Blueprint("testimonials", __name__)


@testimonials_bp.get("/testimonials")
@login_required
@require_staff(["packages.read"])
def list_testimonials():
    items = Testimonial.query.order_by(Testimonial.created.desc()).all()
    return render_template("testimonials_list.html", items=items)


@testimonials_bp.get("/testimonials/create")
@login_required
@require_staff(["packages.manage"])
def create_testimonial():
    return render_template("testimonials_form.html", item=None)


@testimonials_bp.post("/testimonials/create")
@login_required
@require_staff(["packages.manage"])
def create_testimonial_post():
    item = Testimonial(
        author_name=request.form["author_name"],
        author_location=request.form.get("author_location"),
        author_image=request.form.get("author_image"),
        text=request.form["text"],
        rating=int(request.form.get("rating", 5)),
        featured="featured" in request.form,
    )
    db.session.add(item)
    db.session.commit()
    flash("Testimonial added.", "success")
    return redirect(url_for("testimonials.list_testimonials"))


@testimonials_bp.get("/testimonials/edit/<int:id>")
@login_required
@require_staff(["packages.manage"])
def edit_testimonial(id):
    item = Testimonial.query.get_or_404(id)
    return render_template("testimonials_form.html", item=item)


@testimonials_bp.post("/testimonials/edit/<int:id>")
@login_required
@require_staff(["packages.manage"])
def edit_testimonial_post(id):
    item = Testimonial.query.get_or_404(id)
    item.author_name = request.form["author_name"]
    item.author_location = request.form.get("author_location")
    item.author_image = request.form.get("author_image")
    item.text = request.form["text"]
    item.rating = int(request.form.get("rating", 5))
    item.featured = "featured" in request.form
    db.session.commit()
    flash("Testimonial updated.", "success")
    return redirect(url_for("testimonials.list_testimonials"))


@testimonials_bp.post("/testimonials/delete/<int:id>")
@login_required
@require_staff(["packages.manage"])
def delete_testimonial(id):
    item = Testimonial.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    flash("Deleted.", "info")
    return redirect(url_for("testimonials.list_testimonials"))
