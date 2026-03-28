from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import PackageStatus, TravelPackage

packages_bp = Blueprint("packages", __name__)


@packages_bp.get("/packages")
@login_required
@require_staff(["packages.read"])
def list_packages():
    q = request.args.get("q", "")
    status = request.args.get("status", "")
    query = TravelPackage.query
    if q:
        query = query.filter(TravelPackage.title.ilike(f"%{q}%"))
    if status:
        query = query.filter_by(status=status)
    packages = query.order_by(TravelPackage.created.desc()).all()
    return render_template(
        "packages_list.html",
        packages=packages,
        q=q,
        status=status,
        statuses=PackageStatus.CHOICES,
    )


@packages_bp.get("/packages/create")
@login_required
@require_staff(["packages.create"])
def create_package():
    return render_template("packages_form.html", package=None)


@packages_bp.post("/packages/create")
@login_required
@require_staff(["packages.create"])
def create_package_post():
    package = TravelPackage(
        title=request.form["title"],
        description=request.form.get("description"),
        image_url=request.form.get("image_url"),
        duration_days=int(request.form.get("duration_days", 1)),
        price=float(request.form.get("price", 0)),
        status=request.form.get("status", PackageStatus.ACTIVE),
    )
    db.session.add(package)
    db.session.commit()
    flash(f'Package "{package.title}" created.', "success")
    return redirect(url_for("packages.list_packages"))


@packages_bp.get("/packages/edit/<int:id>")
@login_required
@require_staff(["packages.update"])
def edit_package(id):
    package = TravelPackage.query.get_or_404(id)
    return render_template("packages_form.html", package=package)


@packages_bp.post("/packages/edit/<int:id>")
@login_required
@require_staff(["packages.update"])
def edit_package_post(id):
    package = TravelPackage.query.get_or_404(id)
    package.title = request.form["title"]
    package.description = request.form.get("description")
    package.image_url = request.form.get("image_url")
    package.duration_days = int(request.form.get("duration_days", 1))
    package.price = float(request.form.get("price", 0))
    package.status = request.form.get("status", PackageStatus.ACTIVE)
    db.session.commit()
    flash(f'Package "{package.title}" updated.', "success")
    return redirect(url_for("packages.list_packages"))


@packages_bp.post("/packages/delete/<int:id>")
@login_required
@require_staff(["packages.manage"])
def delete_package(id):
    package = TravelPackage.query.get_or_404(id)
    db.session.delete(package)
    db.session.commit()
    flash("Package deleted.", "info")
    return redirect(url_for("packages.list_packages"))
