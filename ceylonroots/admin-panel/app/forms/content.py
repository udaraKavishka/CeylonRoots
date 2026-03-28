from flask_wtf import FlaskForm
from wtforms import (
    BooleanField,
    DateField,
    DecimalField,
    FloatField,
    IntegerField,
    SelectField,
    StringField,
    SubmitField,
    TextAreaField,
)
from wtforms.validators import DataRequired, NumberRange, Optional


class PackageForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[Optional()])
    image_url = StringField("Image URL", validators=[Optional()])
    duration_days = IntegerField(
        "Duration Days", validators=[Optional(), NumberRange(min=1)]
    )
    price = DecimalField("Price", validators=[Optional(), NumberRange(min=0)], places=2)
    rating = FloatField("Rating", validators=[Optional(), NumberRange(min=0, max=5)])
    review_count = IntegerField(
        "Review Count", validators=[Optional(), NumberRange(min=0)]
    )
    destinations_csv = TextAreaField(
        "Destinations (comma-separated)", validators=[Optional()]
    )
    highlights_csv = TextAreaField(
        "Highlights (comma-separated)", validators=[Optional()]
    )
    includes_csv = TextAreaField("Includes (comma-separated)", validators=[Optional()])
    excludes_csv = TextAreaField("Excludes (comma-separated)", validators=[Optional()])
    gallery_csv = TextAreaField(
        "Gallery URLs (comma-separated)", validators=[Optional()]
    )
    submit = SubmitField("Save Package")


class ItineraryDayForm(FlaskForm):
    day_number = IntegerField(
        "Day Number", validators=[DataRequired(), NumberRange(min=1)]
    )
    title = StringField("Title", validators=[Optional()])
    main_town = StringField("Main Town", validators=[Optional()])
    description = TextAreaField("Description", validators=[Optional()])
    accommodations_csv = TextAreaField(
        "Accommodations (comma-separated)", validators=[Optional()]
    )
    meals_csv = TextAreaField("Meals (comma-separated)", validators=[Optional()])
    activities_csv = TextAreaField(
        "Activities (comma-separated)", validators=[Optional()]
    )
    submit = SubmitField("Save Day")


class GuideForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    photo = StringField("Photo URL", validators=[Optional()])
    bio = TextAreaField("Bio", validators=[DataRequired()])
    expertise_csv = TextAreaField(
        "Expertise (comma-separated)", validators=[DataRequired()]
    )
    languages_csv = TextAreaField(
        "Languages (comma-separated)", validators=[DataRequired()]
    )
    experience = IntegerField(
        "Experience (years)", validators=[DataRequired(), NumberRange(min=0)]
    )
    rating = FloatField("Rating", validators=[Optional(), NumberRange(min=0, max=5)])
    review_count = IntegerField(
        "Review Count", validators=[Optional(), NumberRange(min=0)]
    )
    response_time = StringField("Response Time", validators=[Optional()])
    featured = BooleanField("Featured")
    submit = SubmitField("Save Guide")


class DestinationForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[Optional()])
    region = StringField("Region", validators=[Optional()])
    top_attraction = StringField("Top Attraction", validators=[Optional()])
    best_time_to_visit = StringField("Best Time To Visit", validators=[Optional()])
    recommended_duration = StringField("Recommended Duration", validators=[Optional()])
    cultural_tips = TextAreaField("Cultural Tips", validators=[Optional()])
    image = StringField("Image URL", validators=[Optional()])
    latitude = FloatField("Latitude", validators=[Optional()])
    longitude = FloatField("Longitude", validators=[Optional()])
    attractions_csv = TextAreaField(
        "Attractions (comma-separated)", validators=[Optional()]
    )
    submit = SubmitField("Save Destination")


class BlogPostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    excerpt = TextAreaField("Excerpt", validators=[Optional()])
    content = TextAreaField("Content", validators=[Optional()])
    image_url = StringField("Image URL", validators=[Optional()])
    post_date = DateField("Post Date", validators=[Optional()])
    author = StringField("Author", validators=[Optional()])
    category = StringField("Category", validators=[Optional()])
    comment_count = IntegerField(
        "Comment Count", validators=[Optional(), NumberRange(min=0)]
    )
    submit = SubmitField("Save Blog Post")


class TestimonialForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    location = StringField("Location", validators=[DataRequired()])
    image = StringField("Image URL", validators=[Optional()])
    rating = IntegerField("Rating", validators=[Optional(), NumberRange(min=1, max=5)])
    testimonial = TextAreaField("Testimonial", validators=[DataRequired()])
    tour_type = StringField("Tour Type", validators=[Optional()])
    tour_date = StringField("Tour Date", validators=[Optional()])
    featured = BooleanField("Featured")
    submit = SubmitField("Save Testimonial")


class GalleryForm(FlaskForm):
    type = SelectField(
        "Type",
        choices=[("IMAGE", "Image"), ("VIDEO", "Video")],
        validators=[DataRequired()],
    )
    url = StringField("Asset URL", validators=[DataRequired()])
    thumbnail_url = StringField("Thumbnail URL", validators=[Optional()])
    caption = StringField("Caption", validators=[Optional()])
    location = StringField("Location", validators=[Optional()])
    description = TextAreaField("Description", validators=[Optional()])
    featured = BooleanField("Featured")
    date_added = DateField("Date Added", validators=[Optional()])
    submit = SubmitField("Save Gallery Item")


class DepartureForm(FlaskForm):
    package_id = IntegerField(
        "Package ID", validators=[DataRequired(), NumberRange(min=1)]
    )
    departure_date = DateField("Departure Date", validators=[DataRequired()])
    max_slots = IntegerField(
        "Max Slots", validators=[DataRequired(), NumberRange(min=1)]
    )
    booked_slots = IntegerField(
        "Booked Slots", validators=[Optional(), NumberRange(min=0)]
    )
    price_override = FloatField(
        "Price Override", validators=[Optional(), NumberRange(min=0)]
    )
    status = SelectField(
        "Status",
        choices=[
            ("available", "Available"),
            ("limited", "Limited"),
            ("full", "Full"),
            ("cancelled", "Cancelled"),
        ],
        validators=[DataRequired()],
    )
    submit = SubmitField("Save Departure")


class BookingStatusForm(FlaskForm):
    status = SelectField(
        "Status",
        choices=[
            ("pending", "Pending"),
            ("confirmed", "Confirmed"),
            ("cancelled", "Cancelled"),
        ],
        validators=[DataRequired()],
    )
    payment_method = StringField("Payment Method", validators=[Optional()])
    submit = SubmitField("Update Booking")
