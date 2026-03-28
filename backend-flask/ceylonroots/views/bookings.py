from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import Booking, BookingStatus

bookings_bp = Blueprint("bookings", __name__)


@bookings_bp.get("/bookings")
@login_required
@require_staff(["bookings.read"])
def list_bookings():
    q = request.args.get("q", "")
    status = request.args.get("status", "")
    query = Booking.query
    if q:
        query = query.filter(
            db.or_(
                Booking.email.ilike(f"%{q}%"),
                Booking.first_name.ilike(f"%{q}%"),
                Booking.last_name.ilike(f"%{q}%"),
            )
        )
    if status:
        query = query.filter_by(status=status)
    bookings = query.order_by(Booking.created.desc()).all()
    return render_template(
        "bookings_list.html",
        bookings=bookings,
        q=q,
        status=status,
        statuses=BookingStatus.CHOICES,
    )


@bookings_bp.get("/bookings/<booking_id>")
@login_required
@require_staff(["bookings.read"])
def view_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return render_template("bookings_detail.html", booking=booking)


@bookings_bp.post("/bookings/<booking_id>/status")
@login_required
@require_staff(["bookings.manage"])
def update_status(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    new_status = request.form.get("status")
    if new_status in BookingStatus.ALL:
        booking.status = new_status
        db.session.commit()
        flash(f"Status updated to {new_status}.", "success")
    return redirect(url_for("bookings.view_booking", booking_id=booking_id))
