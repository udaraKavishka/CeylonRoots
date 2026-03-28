from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import ComponentType, TravelComponent

destinations_bp = Blueprint("destinations", __name__)


@destinations_bp.get("/destinations")
@login_required
@require_staff(["packages.read"])
def list_destinations():
    component_type = request.args.get("type", "")
    query = TravelComponent.query
    if component_type:
        query = query.filter_by(component_type=component_type)
    items = query.order_by(TravelComponent.name).all()
    return render_template(
        "destinations_list.html",
        items=items,
        component_type=component_type,
        types=ComponentType.CHOICES,
    )


@destinations_bp.get("/destinations/create")
@login_required
@require_staff(["packages.create"])
def create_destination():
    return render_template(
        "destinations_form.html", item=None, types=ComponentType.CHOICES
    )


@destinations_bp.post("/destinations/create")
@login_required
@require_staff(["packages.create"])
def create_destination_post():
    item = TravelComponent(
        name=request.form["name"],
        description=request.form.get("description"),
        image_url=request.form.get("image_url"),
        component_type=request.form.get("component_type", ComponentType.DESTINATION),
        location=request.form.get("location"),
    )
    db.session.add(item)
    db.session.commit()
    flash(f'"{item.name}" created.', "success")
    return redirect(url_for("destinations.list_destinations"))


@destinations_bp.get("/destinations/edit/<int:id>")
@login_required
@require_staff(["packages.update"])
def edit_destination(id):
    item = TravelComponent.query.get_or_404(id)
    return render_template(
        "destinations_form.html", item=item, types=ComponentType.CHOICES
    )


@destinations_bp.post("/destinations/edit/<int:id>")
@login_required
@require_staff(["packages.update"])
def edit_destination_post(id):
    item = TravelComponent.query.get_or_404(id)
    item.name = request.form["name"]
    item.description = request.form.get("description")
    item.image_url = request.form.get("image_url")
    item.component_type = request.form.get("component_type", item.component_type)
    item.location = request.form.get("location")
    db.session.commit()
    flash(f'"{item.name}" updated.', "success")
    return redirect(url_for("destinations.list_destinations"))


@destinations_bp.post("/destinations/delete/<int:id>")
@login_required
@require_staff(["packages.manage"])
def delete_destination(id):
    item = TravelComponent.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    flash("Deleted.", "info")
    return redirect(url_for("destinations.list_destinations"))
