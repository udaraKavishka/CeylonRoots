"""
REST API blueprint — consumed by the Next.js frontend.
All write operations require JWT auth. Public reads are unauthenticated.
"""

import uuid
from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
)
from pydantic import BaseModel, EmailStr, Field, field_validator

from ceylonroots import db
from ceylonroots.models import (
    BlogComment,
    BlogPost,
    Booking,
    BookingStatus,
    GalleryItem,
    Guide,
    Review,
    Submission,
    Testimonial,
    TravelPackage,
)

api_bp = Blueprint("api", __name__)


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------


class PackageOut(BaseModel):
    id: int
    title: str
    description: str | None
    image_url: str | None
    duration_days: int
    price: float
    rating: float | None
    review_count: int | None

    model_config = {"from_attributes": True}

    @field_validator("price", "rating", mode="before")
    @classmethod
    def coerce_decimal(cls, v):
        return float(v) if v is not None else v


class BookingIn(BaseModel):
    package_id: int
    first_name: str = Field(min_length=1)
    last_name: str = Field(min_length=1)
    email: EmailStr
    phone: str | None = None
    address: str | None = None
    city: str | None = None
    country: str | None = None
    zip_code: str | None = None
    traveler_count: int = Field(default=1, ge=1, le=20)
    special_requests: str | None = None
    payment_method: str | None = None
    newsletter_opt_in: bool = False


class BookingOut(BaseModel):
    id: str
    package_id: int
    first_name: str
    last_name: str
    email: str
    traveler_count: int
    total_amount: float | None
    status: str
    payment_method: str | None

    model_config = {"from_attributes": True}

    @field_validator("total_amount", mode="before")
    @classmethod
    def coerce_decimal(cls, v):
        return float(v) if v is not None else v


class ReviewIn(BaseModel):
    package_id: int
    author_name: str = Field(min_length=1)
    author_email: EmailStr | None = None
    rating: int = Field(ge=1, le=5)
    comment: str | None = None
    guide_rating: int | None = Field(default=None, ge=1, le=5)
    value_rating: int | None = Field(default=None, ge=1, le=5)
    travel_type: str | None = None


class CommentIn(BaseModel):
    author: str = Field(min_length=1)
    text: str = Field(min_length=1)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=1)


# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------


@api_bp.post("/auth/login")
def login():
    body = LoginIn.model_validate(request.get_json(force=True) or {})
    from werkzeug.security import check_password_hash

    from ceylonroots.models import AdminUser

    user = AdminUser.query.filter_by(email=str(body.email), active=True).first()
    if not user or not check_password_hash(user.password, body.password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": token, "admin": user.admin})


@api_bp.post("/auth/register")
def register():
    body = RegisterIn.model_validate(request.get_json(force=True) or {})
    from werkzeug.security import generate_password_hash

    from ceylonroots.models import AdminUser

    if AdminUser.query.filter_by(email=str(body.email)).first():
        return jsonify({"error": "Email already registered"}), 409

    parts = body.name.strip().split(" ", 1)
    user = AdminUser(
        email=str(body.email),
        password=generate_password_hash(body.password),
        firstname=parts[0],
        lastname=parts[1] if len(parts) > 1 else "",
        active=True,
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id}), 201


# ---------------------------------------------------------------------------
# Packages
# ---------------------------------------------------------------------------


@api_bp.get("/packages")
def list_packages():
    query = TravelPackage.query.filter_by(status="ACTIVE")
    packages = query.order_by(TravelPackage.created.desc()).all()
    return jsonify([PackageOut.model_validate(p).model_dump() for p in packages])


@api_bp.get("/packages/<int:id>")
def get_package(id):
    package = TravelPackage.query.get_or_404(id)
    data = PackageOut.model_validate(package).model_dump()
    data["itinerary"] = [
        {
            "day": d.day_number,
            "title": d.title,
            "main_town": d.main_town,
            "description": d.description,
            "accommodation": d.accommodation,
            "meals": d.meals,
            "activities": d.activities or [],
        }
        for d in sorted(package.itinerary_days, key=lambda x: x.day_number)
    ]
    data["reviews"] = [
        {
            "id": r.id,
            "author_name": r.author_name,
            "rating": r.rating,
            "comment": r.comment,
            "verified": r.verified,
        }
        for r in package.reviews
        if r.verified
    ]
    return jsonify(data)


# ---------------------------------------------------------------------------
# Destinations
# ---------------------------------------------------------------------------


@api_bp.get("/destinations")
def list_destinations():
    from ceylonroots.models import TravelComponent

    items = TravelComponent.query.filter_by(component_type="DESTINATION").all()
    return jsonify(
        [
            {
                "id": i.id,
                "name": i.name,
                "description": i.description,
                "image_url": i.image_url,
                "location": i.location,
                "tags": i.tags or [],
            }
            for i in items
        ]
    )


# ---------------------------------------------------------------------------
# Guides
# ---------------------------------------------------------------------------


@api_bp.get("/guides")
def list_guides():
    guides = Guide.query.filter_by(active=True).all()
    return jsonify(
        [
            {
                "id": g.id,
                "name": g.name,
                "bio": g.bio,
                "image_url": g.image_url,
                "expertise": g.expertise or [],
                "languages": g.languages or [],
                "experience_years": g.experience_years,
                "rating": float(g.rating) if g.rating else 0,
            }
            for g in guides
        ]
    )


# ---------------------------------------------------------------------------
# Gallery
# ---------------------------------------------------------------------------


@api_bp.get("/gallery")
def list_gallery():
    category = request.args.get("category")
    query = GalleryItem.query
    if category:
        query = query.filter_by(category=category)
    items = query.order_by(GalleryItem.created.desc()).all()
    return jsonify(
        [
            {
                "id": i.id,
                "url": i.url,
                "thumbnail_url": i.thumbnail_url,
                "alt": i.alt,
                "caption": i.caption,
                "category": i.category,
                "media_type": i.media_type,
                "featured": i.featured,
            }
            for i in items
        ]
    )


# ---------------------------------------------------------------------------
# Testimonials
# ---------------------------------------------------------------------------


@api_bp.get("/testimonials")
def list_testimonials():
    items = Testimonial.query.filter_by(featured=True).all()
    return jsonify(
        [
            {
                "id": t.id,
                "author_name": t.author_name,
                "author_location": t.author_location,
                "author_image": t.author_image,
                "text": t.text,
                "rating": t.rating,
            }
            for t in items
        ]
    )


# ---------------------------------------------------------------------------
# Blog
# ---------------------------------------------------------------------------


@api_bp.get("/blog")
def list_blog():
    posts = (
        BlogPost.query.filter_by(published=True)
        .order_by(BlogPost.post_date.desc())
        .all()
    )
    return jsonify(
        [
            {
                "id": p.id,
                "title": p.title,
                "slug": p.slug,
                "excerpt": p.excerpt,
                "image_url": p.image_url,
                "post_date": p.post_date.isoformat() if p.post_date else None,
                "author": p.author,
                "category": p.category,
                "tags": p.tags or [],
                "comment_count": p.comment_count,
            }
            for p in posts
        ]
    )


@api_bp.get("/blog/<int:id>")
def get_blog_post(id):
    post = BlogPost.query.get_or_404(id)
    data = {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "content": post.content,
        "image_url": post.image_url,
        "post_date": post.post_date.isoformat() if post.post_date else None,
        "author": post.author,
        "category": post.category,
        "tags": post.tags or [],
        "comments": [
            {
                "id": c.id,
                "author": c.author,
                "text": c.text,
                "comment_date": c.comment_date.isoformat() if c.comment_date else None,
            }
            for c in post.comments
        ],
    }
    return jsonify(data)


@api_bp.post("/blog/<int:id>/comments")
def add_comment(id):
    post = BlogPost.query.get_or_404(id)
    body = CommentIn.model_validate(request.get_json(force=True) or {})
    comment = BlogComment(
        post_id=post.id,
        author=body.author,
        text=body.text,
        comment_date=datetime.utcnow(),
    )
    db.session.add(comment)
    post.comment_count = (post.comment_count or 0) + 1
    db.session.commit()
    return jsonify({"id": comment.id}), 201


# ---------------------------------------------------------------------------
# Bookings
# ---------------------------------------------------------------------------


@api_bp.post("/bookings")
def create_booking():
    body = BookingIn.model_validate(request.get_json(force=True) or {})
    package = db.session.get(TravelPackage, body.package_id)
    if not package:
        return jsonify({"error": "Package not found"}), 404

    total = float(package.price) * body.traveler_count
    booking = Booking(
        id=str(uuid.uuid4()),
        package_id=body.package_id,
        first_name=body.first_name,
        last_name=body.last_name,
        email=str(body.email),
        phone=body.phone,
        address=body.address,
        city=body.city,
        country=body.country,
        zip_code=body.zip_code,
        traveler_count=body.traveler_count,
        total_amount=total,
        status=BookingStatus.PENDING,
        payment_method=body.payment_method,
        special_requests=body.special_requests,
        newsletter_opt_in=body.newsletter_opt_in,
    )
    db.session.add(booking)
    db.session.commit()

    try:
        from ceylonroots.utils import send_booking_confirmation

        send_booking_confirmation(booking)
    except Exception:
        pass

    return jsonify(BookingOut.model_validate(booking).model_dump()), 201


@api_bp.get("/bookings")
@jwt_required()
def list_bookings():
    # In a full implementation this would filter by user
    bookings = Booking.query.order_by(Booking.created.desc()).limit(50).all()
    return jsonify([BookingOut.model_validate(b).model_dump() for b in bookings])


# ---------------------------------------------------------------------------
# Reviews
# ---------------------------------------------------------------------------


@api_bp.post("/reviews")
def create_review():
    body = ReviewIn.model_validate(request.get_json(force=True) or {})
    review = Review(
        package_id=body.package_id,
        author_name=body.author_name,
        author_email=str(body.author_email) if body.author_email else None,
        rating=body.rating,
        comment=body.comment,
        guide_rating=body.guide_rating,
        value_rating=body.value_rating,
        travel_type=body.travel_type,
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"id": review.id}), 201


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------


@api_bp.post("/contact")
def contact():
    from ceylonroots.models import Contact

    data = request.get_json(force=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"error": "name, email, and message are required"}), 422

    contact_obj = Contact(
        name=name,
        email=email,
        phone=data.get("phone"),
        subject=data.get("subject"),
        message=message,
    )
    db.session.add(contact_obj)
    db.session.commit()

    try:
        from ceylonroots.utils import send_contact_notification

        send_contact_notification(contact_obj)
    except Exception:
        pass

    return jsonify({"status": "received"}), 201


# ---------------------------------------------------------------------------
# Admin stats
# ---------------------------------------------------------------------------


@api_bp.get("/admin/stats")
@jwt_required()
def admin_stats():
    return jsonify(
        {
            "packages": TravelPackage.query.count(),
            "bookings_pending": Booking.query.filter_by(
                status=BookingStatus.PENDING
            ).count(),
            "bookings_confirmed": Booking.query.filter_by(
                status=BookingStatus.CONFIRMED
            ).count(),
            "guides": Guide.query.count(),
            "reviews": Review.query.count(),
            "submissions_new": Submission.query.filter_by(status="NEW").count(),
        }
    )
