from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import login_required, login_user, logout_user
from werkzeug.security import check_password_hash

from ceylonroots import login_manager
from ceylonroots.models import AdminUser

meta_bp = Blueprint("meta", __name__)


@login_manager.user_loader
def load_user(user_id):
    from ceylonroots import db

    return db.session.get(AdminUser, int(user_id))


@meta_bp.get("/login")
def login():
    return render_template("login.html")


@meta_bp.post("/login")
def login_post():
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")
    user = AdminUser.query.filter_by(email=email, active=True).first()
    if not user or not check_password_hash(user.password, password):
        flash("Invalid email or password.", "danger")
        return redirect(url_for("meta.login"))
    login_user(user)
    next_url = request.args.get("next") or url_for("main.dashboard")
    return redirect(next_url)


@meta_bp.get("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("meta.login"))
