import pytz
from email_validator import EmailNotValidError, validate_email
from flask import current_app
from flask_mail import Message
from wtforms import HiddenField, StringField, ValidationError

from ceylonroots import mail

TIMEZONE = pytz.timezone("Asia/Colombo")


# ---------------------------------------------------------------------------
# Jinja filters
# ---------------------------------------------------------------------------


def localtime(dt):
    if dt is None:
        return ""
    if dt.tzinfo is None:
        dt = pytz.utc.localize(dt)
    return dt.astimezone(TIMEZONE)


def strftime(dt, fmt="%d %b %Y"):
    if dt is None:
        return ""
    return localtime(dt).strftime(fmt)


def currency_format(value, symbol="$"):
    try:
        return f"{symbol}{float(value):,.2f}"
    except (TypeError, ValueError):
        return value


# ---------------------------------------------------------------------------
# WTForms validators
# ---------------------------------------------------------------------------


class NoSpaces:
    def __call__(self, form, field):
        if field.data and " " in field.data:
            raise ValidationError("No spaces allowed.")


class NumericOnly:
    def __call__(self, form, field):
        if field.data and not field.data.isdigit():
            raise ValidationError("Numeric characters only.")


class InternationalPhoneNumber:
    def __call__(self, form, field):
        if not field.data:
            return
        import phonenumbers

        try:
            parsed = phonenumbers.parse(field.data, None)
            if not phonenumbers.is_valid_number(parsed):
                raise ValidationError("Invalid phone number.")
        except phonenumbers.NumberParseException:
            raise ValidationError("Invalid phone number format.")


class MultipleEmails:
    def __call__(self, form, field):
        if not field.data:
            return
        for addr in field.data.split(","):
            try:
                validate_email(addr.strip())
            except EmailNotValidError:
                raise ValidationError(f"Invalid email: {addr.strip()}")


class UpperCaseStringField(StringField):
    def process_formdata(self, valuelist):
        if valuelist:
            self.data = valuelist[0].upper()


class Base64HiddenField(HiddenField):
    def process_formdata(self, valuelist):
        if valuelist:
            import base64
            import json

            try:
                self.data = json.loads(base64.b64decode(valuelist[0]))
            except Exception:
                self.data = None

    def _value(self):
        import base64
        import json

        if self.data:
            return base64.b64encode(json.dumps(self.data).encode()).decode()
        return ""


# ---------------------------------------------------------------------------
# Email
# ---------------------------------------------------------------------------


def send_mail(
    to: str,
    subject: str,
    html: str,
    cc: list | None = None,
    reply_to: str | None = None,
    attachments: list | None = None,
):
    msg = Message(
        subject=subject,
        recipients=[to],
        html=html,
        cc=cc or [],
        reply_to=reply_to,
        sender=current_app.config["MAIL_DEFAULT_SENDER"],
    )
    if attachments:
        for attachment in attachments:
            msg.attach(*attachment)
    mail.send(msg)


def send_booking_confirmation(booking):
    """Send confirmation to both the customer and admin."""
    package_name = booking.package.title if booking.package else "Unknown Tour"
    short_id = str(booking.id)[-8:].upper()

    customer_html = f"""
    <h2>Booking Confirmed!</h2>
    <p>Dear {booking.first_name},</p>
    <p>Thank you for booking with CeylonRoots. Your reservation is confirmed.</p>
    <table>
      <tr><td><strong>Booking ID:</strong></td><td>{short_id}</td></tr>
      <tr><td><strong>Tour:</strong></td><td>{package_name}</td></tr>
      <tr><td><strong>Travelers:</strong></td><td>{booking.traveler_count}</td></tr>
      <tr><td><strong>Total:</strong></td><td>${booking.total_amount}</td></tr>
      <tr><td><strong>Payment:</strong></td><td>{booking.payment_method}</td></tr>
    </table>
    <p>We'll be in touch with further details. Safe travels!</p>
    """

    admin_html = f"""
    <h2>New Booking Received</h2>
    <p><strong>Booking ID:</strong> {short_id}</p>
    <p><strong>Customer:</strong> {booking.first_name} {booking.last_name} ({booking.email})</p>
    <p><strong>Tour:</strong> {package_name}</p>
    <p><strong>Travelers:</strong> {booking.traveler_count}</p>
    <p><strong>Total:</strong> ${booking.total_amount}</p>
    """

    send_mail(booking.email, f"Booking Confirmed – {package_name}", customer_html)
    send_mail(
        current_app.config.get("ADMIN_EMAIL", "admin@ceylonroots.com"),
        f"New Booking: {package_name} ({short_id})",
        admin_html,
        reply_to=booking.email,
    )


def send_contact_notification(contact):
    admin_html = f"""
    <h2>New Contact Inquiry</h2>
    <p><strong>From:</strong> {contact.name} ({contact.email})</p>
    <p><strong>Phone:</strong> {contact.phone or 'N/A'}</p>
    <p><strong>Subject:</strong> {contact.subject}</p>
    <hr>
    <p>{contact.message}</p>
    """
    send_mail(
        current_app.config.get("ADMIN_EMAIL", "admin@ceylonroots.com"),
        f"Contact: {contact.subject}",
        admin_html,
        reply_to=contact.email,
    )


def send_submission_notification(submission_type_name: str, data: dict):
    rows = "".join(
        f"<tr><td><strong>{k}:</strong></td><td>{v}</td></tr>" for k, v in data.items()
    )
    html = f"<h2>New {submission_type_name} Submission</h2><table>{rows}</table>"
    send_mail(
        current_app.config.get("ADMIN_EMAIL", "admin@ceylonroots.com"),
        f"New Submission: {submission_type_name}",
        html,
    )
