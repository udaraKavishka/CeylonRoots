from flask import Flask
from flask_caching import Cache
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
cache = Cache()
csrf = CSRFProtect()
jwt = JWTManager()


def create_app():
    app = Flask(__name__, subdomain_matching=True)

    app.config.from_object("ceylonroots.default_config")
    app.config.from_pyfile("../local.cfg", silent=True)
    app.config.from_envvar("APP_SETTINGS", silent=True)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    mail.init_app(app)
    cache.init_app(app)
    csrf.init_app(app)
    CORS(app, supports_credentials=True)
    jwt.init_app(app)

    # Exempt JWT routes from CSRF
    from ceylonroots.views.api import api_bp

    csrf.exempt(api_bp)

    from ceylonroots.views.blog import blog_bp
    from ceylonroots.views.bookings import bookings_bp
    from ceylonroots.views.destinations import destinations_bp
    from ceylonroots.views.gallery import gallery_bp
    from ceylonroots.views.guides import guides_bp
    from ceylonroots.views.main import main_bp
    from ceylonroots.views.meta import meta_bp
    from ceylonroots.views.packages import packages_bp
    from ceylonroots.views.reviews import reviews_bp
    from ceylonroots.views.submissions import submissions_bp
    from ceylonroots.views.testimonials import testimonials_bp

    app.register_blueprint(meta_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(packages_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(destinations_bp)
    app.register_blueprint(guides_bp)
    app.register_blueprint(gallery_bp)
    app.register_blueprint(blog_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(testimonials_bp)
    app.register_blueprint(submissions_bp)
    app.register_blueprint(api_bp, url_prefix="/api")

    from ceylonroots.utils import currency_format, localtime, strftime

    app.jinja_env.filters["localtime"] = localtime
    app.jinja_env.filters["strftime"] = strftime
    app.jinja_env.filters["currency_format"] = currency_format
    app.jinja_env.globals["APP_URL"] = app.config.get("APP_URL", "")

    sentry_dsn = app.config.get("SENTRY_DSN")
    if sentry_dsn:
        import sentry_sdk
        from sentry_sdk.integrations.flask import FlaskIntegration

        sentry_sdk.init(dsn=sentry_dsn, integrations=[FlaskIntegration()])

    return app
