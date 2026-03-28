from datetime import datetime

from flask_login import UserMixin

from .extensions import db


class User(UserMixin, db.Model):
    __tablename__ = "user"

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    role = db.Column(db.String, nullable=False, default="user")


class TravelPackage(db.Model):
    __tablename__ = "travel_package"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String)
    duration_days = db.Column(db.Integer)
    price = db.Column(db.Numeric(10, 2))
    rating = db.Column(db.Float)
    review_count = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)

    destinations = db.relationship(
        "PackageDestination",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )
    highlights = db.relationship(
        "PackageHighlight",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )
    gallery_items = db.relationship(
        "PackageGalleryItem",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )
    includes = db.relationship(
        "PackageInclude",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )
    excludes = db.relationship(
        "PackageExclude",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )
    itinerary_days = db.relationship(
        "ItineraryDay",
        backref="package",
        cascade="all, delete-orphan",
        lazy=True,
    )


class PackageDestination(db.Model):
    __tablename__ = "package_destinations"

    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String, nullable=False)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )


class PackageHighlight(db.Model):
    __tablename__ = "package_highlights"

    id = db.Column(db.Integer, primary_key=True)
    highlight = db.Column(db.String, nullable=False)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )


class PackageGalleryItem(db.Model):
    __tablename__ = "package_gallery"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )


class PackageInclude(db.Model):
    __tablename__ = "package_includes"

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )


class PackageExclude(db.Model):
    __tablename__ = "package_excludes"

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )


class ItineraryDay(db.Model):
    __tablename__ = "itinerary_day"

    id = db.Column(db.Integer, primary_key=True)
    day_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String)
    main_town = db.Column(db.String)
    description = db.Column(db.Text)
    travel_package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )

    accommodations = db.relationship(
        "DayAccommodation",
        backref="day",
        cascade="all, delete-orphan",
        lazy=True,
    )
    meals = db.relationship(
        "DayMeal", backref="day", cascade="all, delete-orphan", lazy=True
    )
    activities = db.relationship(
        "DayActivity",
        backref="day",
        cascade="all, delete-orphan",
        lazy=True,
    )


class DayAccommodation(db.Model):
    __tablename__ = "day_accommodation"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey("itinerary_day.id"), nullable=False)


class DayMeal(db.Model):
    __tablename__ = "day_meal"

    id = db.Column(db.Integer, primary_key=True)
    meal = db.Column(db.String, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey("itinerary_day.id"), nullable=False)


class DayActivity(db.Model):
    __tablename__ = "itinerary_day_activities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey("itinerary_day.id"), nullable=False)


class Guide(db.Model):
    __tablename__ = "guide"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    photo = db.Column(db.String)
    bio = db.Column(db.Text, nullable=False)
    expertise = db.Column(db.ARRAY(db.String), nullable=False)
    languages = db.Column(db.ARRAY(db.String), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=False, default=5.0)
    review_count = db.Column(db.Integer, nullable=False, default=0)
    response_time = db.Column(db.String)
    featured = db.Column(db.Boolean, nullable=False, default=False)


class DestinationDetails(db.Model):
    __tablename__ = "destination_details"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    region = db.Column(db.String)
    top_attraction = db.Column(db.String)
    best_time_to_visit = db.Column(db.String)
    recommended_duration = db.Column(db.String)
    cultural_tips = db.Column(db.String)
    image = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    attractions = db.relationship(
        "DestinationDetailAttraction",
        backref="details",
        cascade="all, delete-orphan",
        lazy=True,
    )


class DestinationDetailAttraction(db.Model):
    __tablename__ = "destination_detail_attractions"

    id = db.Column(db.Integer, primary_key=True)
    attraction = db.Column(db.String, nullable=False)
    details_id = db.Column(
        db.Integer, db.ForeignKey("destination_details.id"), nullable=False
    )


class BlogPost(db.Model):
    __tablename__ = "blog_post"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    excerpt = db.Column(db.Text)
    content = db.Column(db.Text)
    image_url = db.Column(db.String)
    post_date = db.Column(db.Date)
    author = db.Column(db.String)
    category = db.Column(db.String)
    comment_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime)


class Testimonial(db.Model):
    __tablename__ = "testimonial"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    rating = db.Column(db.Integer, nullable=False, default=5)
    testimonial = db.Column(db.Text, nullable=False)
    tour_type = db.Column(db.String)
    tour_date = db.Column(db.String)
    featured = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime)


class GalleryItem(db.Model):
    __tablename__ = "gallery_item"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    thumbnail_url = db.Column(db.String)
    caption = db.Column(db.String)
    location = db.Column(db.String)
    description = db.Column(db.Text)
    featured = db.Column(db.Boolean, default=False)
    date_added = db.Column(db.Date)
    created_at = db.Column(db.DateTime)


class Booking(db.Model):
    __tablename__ = "booking"

    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    traveler_count = db.Column(db.Integer, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, nullable=False, default="pending")
    payment_method = db.Column(db.String)
    special_requests = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    package = db.relationship("TravelPackage", backref="bookings", lazy=True)


class PackageDeparture(db.Model):
    __tablename__ = "package_departure"

    id = db.Column(db.Integer, primary_key=True)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )
    departure_date = db.Column(db.Date, nullable=False)
    max_slots = db.Column(db.Integer, nullable=False)
    booked_slots = db.Column(db.Integer, nullable=False, default=0)
    price_override = db.Column(db.Float)
    status = db.Column(db.String, nullable=False, default="available")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    package = db.relationship("TravelPackage", backref="departures", lazy=True)


class Review(db.Model):
    __tablename__ = "review"

    id = db.Column(db.Integer, primary_key=True)
    package_id = db.Column(
        db.Integer, db.ForeignKey("travel_package.id"), nullable=False
    )
    rating = db.Column(db.Float, nullable=False)
