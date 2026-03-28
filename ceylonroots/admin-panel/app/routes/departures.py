from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import DepartureForm
from ..models import PackageDeparture, TravelPackage


departures_bp = Blueprint("departures", __name__, url_prefix="/departures")


@departures_bp.get("/")
@login_required
@admin_required
def list_departures():
    departures = PackageDeparture.query.order_by(
        PackageDeparture.departure_date.asc()
    ).all()
    packages = TravelPackage.query.order_by(TravelPackage.title.asc()).all()
    return render_template(
        "departures/list.html",
        departures=departures,
        packages=packages,
    )


@departures_bp.route("/new", methods=["GET", "POST"])
@login_required
@admin_required
def new_departure():
    form = DepartureForm()
    if form.validate_on_submit():
        package = TravelPackage.query.get(form.package_id.data)
        if package is None:
            flash("Package not found.", "error")
            return render_template(
                "departures/form.html", form=form, departure=None
            ), 400

        departure = PackageDeparture(
            package_id=form.package_id.data,
            departure_date=form.departure_date.data,
            max_slots=form.max_slots.data,
            booked_slots=form.booked_slots.data or 0,
            price_override=form.price_override.data,
            status=form.status.data,
        )
        db.session.add(departure)
        db.session.commit()
        flash("Departure created.", "success")
        return redirect(url_for("departures.list_departures"))
    return render_template("departures/form.html", form=form, departure=None)


@departures_bp.route("/<int:departure_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_departure(departure_id: int):
    departure = PackageDeparture.query.get_or_404(departure_id)
    form = DepartureForm(obj=departure)
    if form.validate_on_submit():
        package = TravelPackage.query.get(form.package_id.data)
        if package is None:
            flash("Package not found.", "error")
            return render_template(
                "departures/form.html", form=form, departure=departure
            ), 400

        departure.package_id = form.package_id.data
        departure.departure_date = form.departure_date.data
        departure.max_slots = form.max_slots.data
        departure.booked_slots = form.booked_slots.data or 0
        departure.price_override = form.price_override.data
        departure.status = form.status.data
        db.session.commit()
        flash("Departure updated.", "success")
        return redirect(url_for("departures.list_departures"))
    return render_template("departures/form.html", form=form, departure=departure)


@departures_bp.post("/<int:departure_id>/delete")
@login_required
@admin_required
def delete_departure(departure_id: int):
    departure = PackageDeparture.query.get_or_404(departure_id)
    db.session.delete(departure)
    db.session.commit()
    flash("Departure deleted.", "success")
    return redirect(url_for("departures.list_departures"))
