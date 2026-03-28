import os

from dotenv import load_dotenv
from flask import Flask, redirect, url_for
from flask_login import current_user

from .config import DevelopmentConfig
from .extensions import csrf, db, login_manager
from .models import User
from .routes.auth import auth_bp
from .routes.bookings import bookings_bp
from .routes.dashboard import dashboard_bp
from .routes.departures import departures_bp
from .routes.destinations import destinations_bp
from .routes.gallery import gallery_bp
from .routes.guides import guides_bp
from .routes.packages import packages_bp


def create_app() -> Flask:
    load_dotenv(
        dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env.local")
    )

    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)

    login_manager.login_view = "auth.login_page"

    @login_manager.user_loader
    def load_user(user_id: str):
        return User.query.get(user_id)

    @app.get("/")
    def root():
        if current_user.is_authenticated:
            return redirect(url_for("dashboard.index"))
        return redirect(url_for("auth.login_page"))

    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(packages_bp)
    app.register_blueprint(guides_bp)
    app.register_blueprint(destinations_bp)
    app.register_blueprint(gallery_bp)
    app.register_blueprint(departures_bp)
    app.register_blueprint(bookings_bp)

    return app
