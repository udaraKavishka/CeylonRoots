from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import ItineraryDayForm, PackageForm
from ..models import (
    DayAccommodation,
    DayActivity,
    DayMeal,
    ItineraryDay,
    PackageDestination,
    PackageExclude,
    PackageGalleryItem,
    PackageHighlight,
    PackageInclude,
    TravelPackage,
)
from ..utils import csv_to_list, list_to_csv


packages_bp = Blueprint("packages", __name__, url_prefix="/packages")


def _sync_package_relations(pkg: TravelPackage, form: PackageForm):
    pkg.destinations = [
        PackageDestination(destination=value)
        for value in csv_to_list(form.destinations_csv.data)
    ]
    pkg.highlights = [
        PackageHighlight(highlight=value)
        for value in csv_to_list(form.highlights_csv.data)
    ]
    pkg.includes = [
        PackageInclude(item=value) for value in csv_to_list(form.includes_csv.data)
    ]
    pkg.excludes = [
        PackageExclude(item=value) for value in csv_to_list(form.excludes_csv.data)
    ]
    pkg.gallery_items = [
        PackageGalleryItem(url=value) for value in csv_to_list(form.gallery_csv.data)
    ]


@packages_bp.get("/")
@login_required
@admin_required
def list_packages():
    packages = TravelPackage.query.order_by(TravelPackage.created_at.desc()).all()
    return render_template("packages/list.html", packages=packages)


@packages_bp.route("/new", methods=["GET", "POST"])
@login_required
@admin_required
def new_package():
    form = PackageForm()
    if form.validate_on_submit():
        pkg = TravelPackage(
            title=form.title.data,
            description=form.description.data,
            image_url=form.image_url.data,
            duration_days=form.duration_days.data,
            price=form.price.data,
            rating=form.rating.data,
            review_count=form.review_count.data,
        )
        _sync_package_relations(pkg, form)
        db.session.add(pkg)
        db.session.commit()
        flash("Package created.", "success")
        return redirect(url_for("packages.edit_package", package_id=pkg.id))
    return render_template("packages/form.html", form=form, package=None)


@packages_bp.route("/<int:package_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_package(package_id: int):
    pkg = TravelPackage.query.get_or_404(package_id)
    form = PackageForm(obj=pkg)

    if request.method == "GET":
        form.destinations_csv.data = list_to_csv(
            [item.destination for item in pkg.destinations]
        )
        form.highlights_csv.data = list_to_csv(
            [item.highlight for item in pkg.highlights]
        )
        form.includes_csv.data = list_to_csv([item.item for item in pkg.includes])
        form.excludes_csv.data = list_to_csv([item.item for item in pkg.excludes])
        form.gallery_csv.data = list_to_csv([item.url for item in pkg.gallery_items])

    if form.validate_on_submit():
        pkg.title = form.title.data
        pkg.description = form.description.data
        pkg.image_url = form.image_url.data
        pkg.duration_days = form.duration_days.data
        pkg.price = form.price.data
        pkg.rating = form.rating.data
        pkg.review_count = form.review_count.data
        _sync_package_relations(pkg, form)
        db.session.commit()
        flash("Package updated.", "success")
        return redirect(url_for("packages.edit_package", package_id=pkg.id))

    itinerary_days = (
        ItineraryDay.query.filter_by(travel_package_id=pkg.id)
        .order_by(ItineraryDay.day_number.asc())
        .all()
    )
    day_form = ItineraryDayForm()
    return render_template(
        "packages/form.html",
        form=form,
        package=pkg,
        itinerary_days=itinerary_days,
        day_form=day_form,
    )


@packages_bp.post("/<int:package_id>/delete")
@login_required
@admin_required
def delete_package(package_id: int):
    pkg = TravelPackage.query.get_or_404(package_id)
    db.session.delete(pkg)
    db.session.commit()
    flash("Package deleted.", "success")
    return redirect(url_for("packages.list_packages"))


@packages_bp.post("/<int:package_id>/itinerary/new")
@login_required
@admin_required
def add_itinerary_day(package_id: int):
    pkg = TravelPackage.query.get_or_404(package_id)
    form = ItineraryDayForm()
    if not form.validate_on_submit():
        flash("Invalid itinerary data.", "error")
        return redirect(url_for("packages.edit_package", package_id=package_id))

    day = ItineraryDay(
        travel_package_id=pkg.id,
        day_number=form.day_number.data,
        title=form.title.data,
        main_town=form.main_town.data,
        description=form.description.data,
        accommodations=[
            DayAccommodation(name=value)
            for value in csv_to_list(form.accommodations_csv.data)
        ],
        meals=[DayMeal(meal=value) for value in csv_to_list(form.meals_csv.data)],
        activities=[
            DayActivity(name=value) for value in csv_to_list(form.activities_csv.data)
        ],
    )
    db.session.add(day)
    db.session.commit()
    flash("Itinerary day added.", "success")
    return redirect(url_for("packages.edit_package", package_id=package_id))


@packages_bp.post("/<int:package_id>/itinerary/<int:day_id>/delete")
@login_required
@admin_required
def delete_itinerary_day(package_id: int, day_id: int):
    _ = TravelPackage.query.get_or_404(package_id)
    day = ItineraryDay.query.filter_by(
        id=day_id, travel_package_id=package_id
    ).first_or_404()
    db.session.delete(day)
    db.session.commit()
    flash("Itinerary day deleted.", "success")
    return redirect(url_for("packages.edit_package", package_id=package_id))
