import pytest

from ceylonroots import create_app
from ceylonroots import db as _db


@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config.update(
        {
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "postgresql://postgres:postgres@localhost/ceylonroots_test",
            "WTF_CSRF_ENABLED": False,
            "SERVER_NAME": "localhost",
        }
    )
    with app.app_context():
        _db.create_all()
        yield app
        _db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def auth_client(app, client):
    """Client logged in as admin."""
    from werkzeug.security import generate_password_hash

    from ceylonroots.models import AdminUser

    user = AdminUser.query.filter_by(email="test@ceylonroots.com").first()
    if not user:
        user = AdminUser(
            email="test@ceylonroots.com",
            password=generate_password_hash("testpass"),
            firstname="Test",
            lastname="Admin",
            admin=True,
            active=True,
        )
        _db.session.add(user)
        _db.session.commit()

    client.post(
        "/login", data={"email": "test@ceylonroots.com", "password": "testpass"}
    )
    return client
