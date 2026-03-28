from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import login_required

from ..decorators import admin_required
from ..extensions import db
from ..forms.content import GalleryForm
from ..models import GalleryItem


gallery_bp = Blueprint("gallery", __name__, url_prefix="/gallery")


@gallery_bp.get("/")
@login_required
@admin_required
def list_gallery_items():
    items = GalleryItem.query.order_by(GalleryItem.created_at.desc()).all()
    return render_template("gallery/list.html", items=items)


@gallery_bp.route("/new", methods=["GET", "POST"])
@login_required
@admin_required
def new_gallery_item():
    form = GalleryForm()
    if form.validate_on_submit():
        item = GalleryItem(
            type=form.type.data,
            url=form.url.data,
            thumbnail_url=form.thumbnail_url.data,
            caption=form.caption.data,
            location=form.location.data,
            description=form.description.data,
            featured=form.featured.data,
            date_added=form.date_added.data,
        )
        db.session.add(item)
        db.session.commit()
        flash("Gallery item created.", "success")
        return redirect(url_for("gallery.list_gallery_items"))
    return render_template("gallery/form.html", form=form, item=None)


@gallery_bp.route("/<int:item_id>/edit", methods=["GET", "POST"])
@login_required
@admin_required
def edit_gallery_item(item_id: int):
    item = GalleryItem.query.get_or_404(item_id)
    form = GalleryForm(obj=item)
    if form.validate_on_submit():
        item.type = form.type.data
        item.url = form.url.data
        item.thumbnail_url = form.thumbnail_url.data
        item.caption = form.caption.data
        item.location = form.location.data
        item.description = form.description.data
        item.featured = form.featured.data
        item.date_added = form.date_added.data
        db.session.commit()
        flash("Gallery item updated.", "success")
        return redirect(url_for("gallery.list_gallery_items"))
    return render_template("gallery/form.html", form=form, item=item)


@gallery_bp.post("/<int:item_id>/delete")
@login_required
@admin_required
def delete_gallery_item(item_id: int):
    item = GalleryItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    flash("Gallery item deleted.", "success")
    return redirect(url_for("gallery.list_gallery_items"))
