from datetime import datetime

import pytz
from flask_login import UserMixin
from sqlalchemy.dialects import postgresql as pg

from ceylonroots import db

TIMEZONE = pytz.timezone("Asia/Colombo")


# ---------------------------------------------------------------------------
# Mixins
# ---------------------------------------------------------------------------


class TimestampMixin:
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------


class Role(db.Model):
    __tablename__ = "admin_role"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    permissions = db.Column(pg.ARRAY(db.String), default=list)

    PERMISSIONS = {
        "packages.read": "View packages",
        "packages.create": "Create packages",
        "packages.update": "Edit packages",
        "packages.manage": "Full package access",
        "bookings.read": "View bookings",
        "bookings.manage": "Full booking access",
        "blog.manage": "Manage blog posts",
        "guides.manage": "Manage guides",
        "gallery.manage": "Manage gallery",
        "submissions.read": "View form submissions",
    }


class AdminUser(UserMixin, TimestampMixin, db.Model):
    """Backend admin / staff users — separate from NextAuth public users."""

    __tablename__ = "admin_user"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)
    role_id = db.Column(
        db.Integer, db.ForeignKey("admin_role.id", ondelete="RESTRICT"), nullable=True
    )
    role = db.relationship("Role", lazy="joined")

    @property
    def fullname(self):
        return f"{self.firstname} {self.lastname}"

    def has_permission(self, code: str) -> bool:
        if self.admin:
            return True
        if not self.role:
            return False
        return code in (self.role.permissions or [])


# ---------------------------------------------------------------------------
# Travel Packages
# ---------------------------------------------------------------------------


class PackageStatus:
    ACTIVE = "ACTIVE"
    DRAFT = "DRAFT"
    ARCHIVED = "ARCHIVED"
    ALL = [ACTIVE, DRAFT, ARCHIVED]
    CHOICES = [(s, s.title()) for s in ALL]


class TravelPackage(TimestampMixin, db.Model):
    __tablename__ = "TravelPackage"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column("imageUrl", db.String(500))
    duration_days = db.Column("durationDays", db.Integer, nullable=False, default=1)
    price = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    rating = db.Column(db.Numeric(3, 2), default=0)
    review_count = db.Column("reviewCount", db.Integer, default=0)
    status = db.Column(db.String(20), default=PackageStatus.ACTIVE)

    itinerary_days = db.relationship(
        "ItineraryDay", back_populates="package", cascade="all, delete-orphan"
    )
    bookings = db.relationship("Booking", back_populates="package")
    reviews = db.relationship("Review", back_populates="package")


class ItineraryDay(TimestampMixin, db.Model):
    __tablename__ = "ItineraryDay"

    id = db.Column(db.Integer, primary_key=True)
    package_id = db.Column(
        db.Integer,
        db.ForeignKey("TravelPackage.id", ondelete="CASCADE"),
        nullable=False,
    )
    day_number = db.Column("dayNumber", db.Integer, nullable=False)
    title = db.Column(db.String(200))
    main_town = db.Column("mainTown", db.String(200))
    description = db.Column(db.Text)
    accommodation = db.Column(db.String(200))
    meals = db.Column(db.String(200))
    activities = db.Column(pg.JSONB, default=list)

    package = db.relationship("TravelPackage", back_populates="itinerary_days")


# ---------------------------------------------------------------------------
# Travel Components (STI)
# ---------------------------------------------------------------------------


class ComponentType:
    DESTINATION = "DESTINATION"
    ACCOMMODATION = "ACCOMMODATION"
    ACTIVITY = "ACTIVITY"
    TRANSPORT = "TRANSPORT"
    ALL = [DESTINATION, ACCOMMODATION, ACTIVITY, TRANSPORT]
    CHOICES = [(t, t.title()) for t in ALL]


class TravelComponent(TimestampMixin, db.Model):
    __tablename__ = "TravelComponent"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column("imageUrl", db.String(500))
    component_type = db.Column("componentType", db.String(50), nullable=False)
    location = db.Column(db.String(200))
    tags = db.Column(pg.ARRAY(db.String), default=list)
    gallery = db.Column(pg.JSONB, default=list)
    extra = db.Column(pg.JSONB, default=dict)


# ---------------------------------------------------------------------------
# Bookings
# ---------------------------------------------------------------------------


class BookingStatus:
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    ALL = [PENDING, CONFIRMED, CANCELLED]
    CHOICES = [(s, s.title()) for s in ALL]


class Booking(TimestampMixin, db.Model):
    __tablename__ = "Booking"

    id = db.Column(db.String(36), primary_key=True)
    package_id = db.Column(
        db.Integer,
        db.ForeignKey("TravelPackage.id", ondelete="RESTRICT"),
        nullable=False,
    )
    first_name = db.Column("firstName", db.String(100), nullable=False)
    last_name = db.Column("lastName", db.String(100), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50))
    address = db.Column(db.String(300))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    zip_code = db.Column("zipCode", db.String(20))
    traveler_count = db.Column("travelerCount", db.Integer, default=1, nullable=False)
    total_amount = db.Column("totalAmount", db.Numeric(10, 2))
    status = db.Column(db.String(20), default=BookingStatus.PENDING, nullable=False)
    payment_method = db.Column("paymentMethod", db.String(50))
    special_requests = db.Column("specialRequests", db.Text)
    newsletter_opt_in = db.Column("newsletterOptIn", db.Boolean, default=False)

    package = db.relationship("TravelPackage", back_populates="bookings")


# ---------------------------------------------------------------------------
# Reviews
# ---------------------------------------------------------------------------


class Review(TimestampMixin, db.Model):
    __tablename__ = "Review"

    id = db.Column(db.Integer, primary_key=True)
    package_id = db.Column(
        db.Integer,
        db.ForeignKey("TravelPackage.id", ondelete="CASCADE"),
        nullable=False,
    )
    author_name = db.Column("authorName", db.String(100), nullable=False)
    author_email = db.Column("authorEmail", db.String(200))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    guide_rating = db.Column("guideRating", db.Integer)
    value_rating = db.Column("valueRating", db.Integer)
    itinerary_rating = db.Column("itineraryRating", db.Integer)
    travel_type = db.Column("travelType", db.String(50))
    trip_date = db.Column("tripDate", db.DateTime)
    verified = db.Column(db.Boolean, default=False)
    helpful = db.Column(db.Integer, default=0)

    package = db.relationship("TravelPackage", back_populates="reviews")


# ---------------------------------------------------------------------------
# Blog
# ---------------------------------------------------------------------------


class BlogPost(TimestampMixin, db.Model):
    __tablename__ = "BlogPost"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    slug = db.Column(db.String(300), unique=True)
    excerpt = db.Column(db.Text)
    content = db.Column(db.Text)
    image_url = db.Column("imageUrl", db.String(500))
    post_date = db.Column("postDate", db.DateTime, default=datetime.utcnow)
    author = db.Column(db.String(100))
    category = db.Column(db.String(100))
    tags = db.Column(pg.ARRAY(db.String), default=list)
    comment_count = db.Column("commentCount", db.Integer, default=0)
    published = db.Column(db.Boolean, default=True)

    comments = db.relationship(
        "BlogComment", back_populates="post", cascade="all, delete-orphan"
    )


class BlogComment(TimestampMixin, db.Model):
    __tablename__ = "BlogComment"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(
        db.Integer, db.ForeignKey("BlogPost.id", ondelete="CASCADE"), nullable=False
    )
    author = db.Column(db.String(100), nullable=False)
    avatar_url = db.Column("avatarUrl", db.String(500))
    text = db.Column(db.Text, nullable=False)
    comment_date = db.Column("commentDate", db.DateTime, default=datetime.utcnow)

    post = db.relationship("BlogPost", back_populates="comments")


# ---------------------------------------------------------------------------
# Guides
# ---------------------------------------------------------------------------


class Guide(TimestampMixin, db.Model):
    __tablename__ = "Guide"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    bio = db.Column(db.Text)
    image_url = db.Column("imageUrl", db.String(500))
    expertise = db.Column(pg.ARRAY(db.String), default=list)
    languages = db.Column(pg.ARRAY(db.String), default=list)
    experience_years = db.Column("experienceYears", db.Integer, default=0)
    rating = db.Column(db.Numeric(3, 2), default=0)
    review_count = db.Column("reviewCount", db.Integer, default=0)
    active = db.Column(db.Boolean, default=True)


# ---------------------------------------------------------------------------
# Testimonials
# ---------------------------------------------------------------------------


class Testimonial(TimestampMixin, db.Model):
    __tablename__ = "Testimonial"

    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column("authorName", db.String(100), nullable=False)
    author_location = db.Column("authorLocation", db.String(100))
    author_image = db.Column("authorImage", db.String(500))
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=5)
    featured = db.Column(db.Boolean, default=False)


# ---------------------------------------------------------------------------
# Gallery
# ---------------------------------------------------------------------------


class GalleryItem(TimestampMixin, db.Model):
    __tablename__ = "GalleryItem"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    thumbnail_url = db.Column("thumbnailUrl", db.String(500))
    alt = db.Column(db.String(200))
    caption = db.Column(db.String(300))
    category = db.Column(db.String(100))
    media_type = db.Column("mediaType", db.String(20), default="image")
    featured = db.Column(db.Boolean, default=False)


# ---------------------------------------------------------------------------
# Contact (raw contact form submissions)
# ---------------------------------------------------------------------------


class Contact(TimestampMixin, db.Model):
    __tablename__ = "contact"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50))
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)


# ---------------------------------------------------------------------------
# Generic JSON-driven Submission
# ---------------------------------------------------------------------------


class SubmissionStatus:
    NEW = "NEW"
    REVIEWED = "REVIEWED"
    ACTIONED = "ACTIONED"
    SPAM = "SPAM"
    ALL = [NEW, REVIEWED, ACTIONED, SPAM]
    CHOICES = [(s, s.title()) for s in ALL]


class Submission(TimestampMixin, db.Model):
    """Stores all public form submissions defined in submissions.json."""

    __tablename__ = "submission"

    id = db.Column(db.Integer, primary_key=True)
    type_code = db.Column(db.String(100), nullable=False, index=True)
    data = db.Column(pg.JSONB, nullable=False, default=dict)
    status = db.Column(db.String(20), default=SubmissionStatus.NEW, nullable=False)
    notes = db.Column(db.Text)
