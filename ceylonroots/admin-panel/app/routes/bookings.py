from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import BookingStatusForm
from ..models import Booking


bookings_bp = Blueprint("bookings", __name__, url_prefix="/bookings")


@bookings_bp.get("/")
@login_required
@admin_required
def list_bookings():
    bookings = Booking.query.order_by(Booking.created_at.desc()).all()
    return render_template("bookings/list.html", bookings=bookings)


@bookings_bp.route("/<string:booking_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_booking(booking_id: str):
    booking = Booking.query.get_or_404(booking_id)
    form = BookingStatusForm(obj=booking)
    if form.validate_on_submit():
        booking.status = form.status.data
        booking.payment_method = form.payment_method.data
        db.session.commit()
        flash("Booking updated.", "success")
        return redirect(url_for("bookings.list_bookings"))
    return render_template("bookings/form.html", form=form, booking=booking)
