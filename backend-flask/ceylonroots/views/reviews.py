from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import Review

reviews_bp = Blueprint("reviews", __name__)


@reviews_bp.get("/reviews")
@login_required
@require_staff(["packages.read"])
def list_reviews():
    package_id = request.args.get("package_id", type=int)
    query = Review.query
    if package_id:
        query = query.filter_by(package_id=package_id)
    reviews = query.order_by(Review.created.desc()).all()
    return render_template("reviews_list.html", reviews=reviews, package_id=package_id)


@reviews_bp.post("/reviews/<int:id>/verify")
@login_required
@require_staff(["packages.manage"])
def verify_review(id):
    review = Review.query.get_or_404(id)
    review.verified = not review.verified
    db.session.commit()
    flash("Verification status updated.", "success")
    return redirect(url_for("reviews.list_reviews"))


@reviews_bp.post("/reviews/delete/<int:id>")
@login_required
@require_staff(["packages.manage"])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    flash("Review deleted.", "info")
    return redirect(url_for("reviews.list_reviews"))
