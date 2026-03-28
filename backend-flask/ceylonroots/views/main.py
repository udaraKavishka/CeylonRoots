from flask import Blueprint, render_template
from flask_login import login_required

from ceylonroots.models import (
    Booking,
    BookingStatus,
    Guide,
    Review,
    Submission,
    TravelPackage,
)

main_bp = Blueprint("main", __name__)


@main_bp.get("/")
@login_required
def dashboard():
    stats = {
        "packages": TravelPackage.query.count(),
        "bookings_total": Booking.query.count(),
        "bookings_pending": Booking.query.filter_by(
            status=BookingStatus.PENDING
        ).count(),
        "bookings_confirmed": Booking.query.filter_by(
            status=BookingStatus.CONFIRMED
        ).count(),
        "guides": Guide.query.filter_by(active=True).count(),
        "reviews": Review.query.count(),
        "submissions_new": Submission.query.filter_by(status="NEW").count(),
    }
    recent_bookings = Booking.query.order_by(Booking.created.desc()).limit(10).all()
    return render_template("index.html", stats=stats, recent_bookings=recent_bookings)
