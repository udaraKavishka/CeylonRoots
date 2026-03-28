from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required

from ceylonroots import db
from ceylonroots.access import require_staff
from ceylonroots.models import BlogComment, BlogPost

blog_bp = Blueprint("blog", __name__)


@blog_bp.get("/blog")
@login_required
@require_staff(["blog.manage"])
def list_posts():
    q = request.args.get("q", "")
    query = BlogPost.query
    if q:
        query = query.filter(BlogPost.title.ilike(f"%{q}%"))
    posts = query.order_by(BlogPost.post_date.desc()).all()
    return render_template("blog_list.html", posts=posts, q=q)


@blog_bp.get("/blog/create")
@login_required
@require_staff(["blog.manage"])
def create_post():
    return render_template("blog_form.html", post=None)


@blog_bp.post("/blog/create")
@login_required
@require_staff(["blog.manage"])
def create_post_post():
    import re

    title = request.form["title"]
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    post = BlogPost(
        title=title,
        slug=slug,
        excerpt=request.form.get("excerpt"),
        content=request.form.get("content"),
        image_url=request.form.get("image_url"),
        author=request.form.get("author"),
        category=request.form.get("category"),
        published="published" in request.form,
    )
    db.session.add(post)
    db.session.commit()
    flash(f'Post "{post.title}" created.', "success")
    return redirect(url_for("blog.list_posts"))


@blog_bp.get("/blog/edit/<int:id>")
@login_required
@require_staff(["blog.manage"])
def edit_post(id):
    post = BlogPost.query.get_or_404(id)
    return render_template("blog_form.html", post=post)


@blog_bp.post("/blog/edit/<int:id>")
@login_required
@require_staff(["blog.manage"])
def edit_post_post(id):
    post = BlogPost.query.get_or_404(id)
    post.title = request.form["title"]
    post.excerpt = request.form.get("excerpt")
    post.content = request.form.get("content")
    post.image_url = request.form.get("image_url")
    post.author = request.form.get("author")
    post.category = request.form.get("category")
    post.published = "published" in request.form
    db.session.commit()
    flash(f'Post "{post.title}" updated.', "success")
    return redirect(url_for("blog.list_posts"))


@blog_bp.post("/blog/delete/<int:id>")
@login_required
@require_staff(["blog.manage"])
def delete_post(id):
    post = BlogPost.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    flash("Post deleted.", "info")
    return redirect(url_for("blog.list_posts"))


@blog_bp.post("/blog/<int:post_id>/comments/<int:comment_id>/delete")
@login_required
@require_staff(["blog.manage"])
def delete_comment(post_id, comment_id):
    comment = BlogComment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    flash("Comment deleted.", "info")
    return redirect(url_for("blog.edit_post", id=post_id))
