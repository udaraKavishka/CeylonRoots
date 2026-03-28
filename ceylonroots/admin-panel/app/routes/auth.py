import os
import uuid

import bcrypt
from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

from ..extensions import db
from ..forms.auth import LoginForm, SignupForm
from ..models import User


auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.get("/login")
def login_page():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.index"))
    form = LoginForm()
    return render_template("auth/login.html", form=form)


@auth_bp.post("/login")
def login_submit():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.index"))

    form = LoginForm()
    if not form.validate_on_submit():
        return render_template("auth/login.html", form=form), 400

    user = User.query.filter_by(email=form.email.data).first()
    if not user or not user.password:
        flash("Invalid email or password.", "error")
        return render_template("auth/login.html", form=form), 401

    password_input = form.password.data or ""
    if not password_input:
        flash("Invalid email or password.", "error")
        return render_template("auth/login.html", form=form), 401

    password_ok = bcrypt.checkpw(
        password_input.encode("utf-8"), user.password.encode("utf-8")
    )
    if not password_ok:
        flash("Invalid email or password.", "error")
        return render_template("auth/login.html", form=form), 401

    if user.role != "admin":
        flash("Admin access required.", "error")
        return render_template("auth/login.html", form=form), 403

    login_user(user)
    next_url = request.args.get("next")
    return redirect(next_url or url_for("dashboard.index"))


@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.index"))

    form = SignupForm()
    if form.validate_on_submit():
        invite_key = os.getenv("ADMIN_SIGNUP_KEY", "")
        if not invite_key or form.admin_invite_key.data != invite_key:
            flash("Invalid admin invite key.", "error")
            return render_template("auth/signup.html", form=form), 403

        existing = User.query.filter_by(email=form.email.data).first()
        if existing:
            flash("Email already registered.", "error")
            return render_template("auth/signup.html", form=form), 409

        password_input = form.password.data or ""
        if not password_input:
            flash("Password is required.", "error")
            return render_template("auth/signup.html", form=form), 400

        hashed = bcrypt.hashpw(
            password_input.encode("utf-8"), bcrypt.gensalt(rounds=12)
        ).decode("utf-8")

        user = User(
            id=str(uuid.uuid4()),
            name=form.name.data,
            email=form.email.data,
            password=hashed,
            role="admin",
        )
        db.session.add(user)
        db.session.commit()
        flash("Admin account created. You can now sign in.", "success")
        return redirect(url_for("auth.login_page"))

    return render_template("auth/signup.html", form=form)


@auth_bp.post("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("auth.login_page"))
