from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import GalleryItem

gallery_bp = Blueprint("gallery", __name__)


@gallery_bp.get("/gallery")
@login_required
@require_staff(["gallery.manage"])
def list_gallery():
    category = request.args.get("category", "")
    query = GalleryItem.query
    if category:
        query = query.filter_by(category=category)
    items = query.order_by(GalleryItem.created.desc()).all()
    categories = [
        r[0] for r in db.session.query(GalleryItem.category).distinct().all() if r[0]
    ]
    return render_template(
        "gallery_list.html", items=items, category=category, categories=categories
    )


@gallery_bp.get("/gallery/create")
@login_required
@require_staff(["gallery.manage"])
def create_item():
    return render_template("gallery_form.html", item=None)


@gallery_bp.post("/gallery/create")
@login_required
@require_staff(["gallery.manage"])
def create_item_post():
    item = GalleryItem(
        url=request.form["url"],
        thumbnail_url=request.form.get("thumbnail_url"),
        alt=request.form.get("alt"),
        caption=request.form.get("caption"),
        category=request.form.get("category"),
        media_type=request.form.get("media_type", "image"),
        featured="featured" in request.form,
    )
    db.session.add(item)
    db.session.commit()
    flash("Gallery item added.", "success")
    return redirect(url_for("gallery.list_gallery"))


@gallery_bp.post("/gallery/delete/<int:id>")
@login_required
@require_staff(["gallery.manage"])
def delete_item(id):
    item = GalleryItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    flash("Item deleted.", "info")
    return redirect(url_for("gallery.list_gallery"))
