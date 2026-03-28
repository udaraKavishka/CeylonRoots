from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import DestinationForm
from ..models import DestinationDetailAttraction, DestinationDetails
from ..utils import csv_to_list, list_to_csv


destinations_bp = Blueprint("destinations", __name__, url_prefix="/destinations")


@destinations_bp.get("/")
@login_required
@admin_required
def list_destinations():
    destinations = DestinationDetails.query.order_by(
        DestinationDetails.name.asc()
    ).all()
    return render_template("destinations/list.html", destinations=destinations)


@destinations_bp.route("/new", methods=["GET", "POST"])
@login_required
@admin_required
def new_destination():
    form = DestinationForm()
    if form.validate_on_submit():
        dest = DestinationDetails(
            name=form.name.data,
            description=form.description.data,
            region=form.region.data,
            top_attraction=form.top_attraction.data,
            best_time_to_visit=form.best_time_to_visit.data,
            recommended_duration=form.recommended_duration.data,
            cultural_tips=form.cultural_tips.data,
            image=form.image.data,
            latitude=form.latitude.data,
            longitude=form.longitude.data,
            attractions=[
                DestinationDetailAttraction(attraction=value)
                for value in csv_to_list(form.attractions_csv.data)
            ],
        )
        db.session.add(dest)
        db.session.commit()
        flash("Destination created.", "success")
        return redirect(url_for("destinations.list_destinations"))
    return render_template("destinations/form.html", form=form, destination=None)


@destinations_bp.route("/<int:destination_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_destination(destination_id: int):
    destination = DestinationDetails.query.get_or_404(destination_id)
    form = DestinationForm(obj=destination)
    if request.method == "GET":
        form.attractions_csv.data = list_to_csv(
            [item.attraction for item in destination.attractions]
        )

    if form.validate_on_submit():
        destination.name = form.name.data
        destination.description = form.description.data
        destination.region = form.region.data
        destination.top_attraction = form.top_attraction.data
        destination.best_time_to_visit = form.best_time_to_visit.data
        destination.recommended_duration = form.recommended_duration.data
        destination.cultural_tips = form.cultural_tips.data
        destination.image = form.image.data
        destination.latitude = form.latitude.data
        destination.longitude = form.longitude.data
        destination.attractions = [
            DestinationDetailAttraction(attraction=value)
            for value in csv_to_list(form.attractions_csv.data)
        ]
        db.session.commit()
        flash("Destination updated.", "success")
        return redirect(url_for("destinations.list_destinations"))

    return render_template("destinations/form.html", form=form, destination=destination)


@destinations_bp.post("/<int:destination_id>/delete")
@login_required
@admin_required
def delete_destination(destination_id: int):
    destination = DestinationDetails.query.get_or_404(destination_id)
    db.session.delete(destination)
    db.session.commit()
    flash("Destination deleted.", "success")
    return redirect(url_for("destinations.list_destinations"))
