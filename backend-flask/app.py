import click

from ceylonroots import create_app, db

app = create_app()


@app.cli.command("initdb")
def initdb():
    """Create all database tables."""
    db.create_all()
    click.echo("Database tables created.")


@app.cli.command("dropdb")
def dropdb():
    """Drop all database tables."""
    if click.confirm("Are you sure? This will delete all data."):
        db.drop_all()
        click.echo("Database dropped.")


@app.cli.command("create-admin")
@click.option("--email", required=True, prompt=True)
@click.option("--password", required=True, prompt=True, hide_input=True)
@click.option("--firstname", required=True, prompt=True)
@click.option("--lastname", required=True, prompt=True)
def create_admin(email, password, firstname, lastname):
    """Bootstrap an admin user."""
    from werkzeug.security import generate_password_hash

    from ceylonroots.models import AdminUser

    existing = AdminUser.query.filter_by(email=email).first()
    if existing:
        click.echo(f"User {email} already exists.")
        return

    user = AdminUser(
        email=email,
        password=generate_password_hash(password),
        firstname=firstname,
        lastname=lastname,
        admin=True,
        active=True,
    )
    db.session.add(user)
    db.session.commit()
    click.echo(f"Admin created: {email}")


@app.cli.command("generate-submission-meta")
def generate_submission_meta():
    """Load submissions.json definitions (clears the LRU cache)."""
    from ceylonroots.views.submissions import _load_definitions

    _load_definitions.cache_clear()
    defs = _load_definitions()
    click.echo(f"Loaded {len(defs)} submission definitions:")
    for d in defs:
        click.echo(f"  - {d['code']}: {d['name']} ({len(d['fields'])} fields)")


@app.cli.command("test-email")
@click.argument("to")
def test_email(to):
    """Send a test email to verify mail configuration."""
    from ceylonroots.utils import send_mail

    send_mail(
        to,
        "CeylonRoots — Test Email",
        "<h2>It works!</h2><p>Mail is configured correctly.</p>",
    )
    click.echo(f"Test email sent to {to}")
