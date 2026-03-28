from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
    submit = SubmitField("Sign in")


class SignupForm(FlaskForm):
    name = StringField("Full Name", validators=[DataRequired(), Length(min=2, max=120)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
    admin_invite_key = StringField("Admin Invite Key", validators=[DataRequired()])
    submit = SubmitField("Create admin account")
