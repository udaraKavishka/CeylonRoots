from sqlalchemy import func

from flask import Blueprint, render_template
from flask_login import login_required

from ..decorators import admin_required
from ..models import (
    Booking,
    DestinationDetails,
    GalleryItem,
    Guide,
    Review,
    TravelPackage,
)


dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.get("/dashboard")
@login_required
@admin_required
def index():
    counts = {
        "packages": TravelPackage.query.count(),
        "bookings": Booking.query.count(),
        "guides": Guide.query.count(),
        "destinations": DestinationDetails.query.count(),
        "reviews": Review.query.count(),
        "gallery": GalleryItem.query.count(),
    }

    top_packages = (
        TravelPackage.query.order_by(TravelPackage.rating.desc().nullslast())
        .limit(6)
        .all()
    )

    latest_bookings = Booking.query.order_by(Booking.created_at.desc()).limit(10).all()

    review_distribution_rows = (
        Review.query.with_entities(
            func.round(Review.rating).label("bucket"), func.count()
        )
        .group_by("bucket")
        .order_by("bucket")
        .all()
    )

    review_distribution = [
        {"rating": int(row[0]), "count": row[1]}
        for row in review_distribution_rows
        if row[0] is not None
    ]

    return render_template(
        "dashboard/index.html",
        counts=counts,
        top_packages=top_packages,
        latest_bookings=latest_bookings,
        review_distribution=review_distribution,
    )
