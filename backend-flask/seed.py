"""Seed the database with sample data for development."""

from werkzeug.security import generate_password_hash

from ceylonroots import create_app, db
from ceylonroots.models import (
    AdminUser,
    Guide,
    Testimonial,
    TravelPackage,
)

app = create_app()

with app.app_context():
    # Admin user
    if not AdminUser.query.filter_by(email="admin@ceylonroots.com").first():
        db.session.add(
            AdminUser(
                email="admin@ceylonroots.com",
                password=generate_password_hash("admin123"),
                firstname="Admin",
                lastname="User",
                admin=True,
                active=True,
            )
        )

    # Sample packages
    if not TravelPackage.query.first():
        db.session.add_all(
            [
                TravelPackage(
                    title="Cultural Triangle & Ancient Kingdoms",
                    description="Explore Sigiriya, Polonnaruwa, and Anuradhapura — the heart of Sri Lanka's ancient civilisations.",
                    duration_days=7,
                    price=1490,
                    rating=4.9,
                    review_count=48,
                ),
                TravelPackage(
                    title="Southern Coast & Wildlife Safari",
                    description="Pristine beaches, sea turtles, and close encounters with leopards at Yala National Park.",
                    duration_days=10,
                    price=1890,
                    rating=4.8,
                    review_count=31,
                ),
                TravelPackage(
                    title="Hill Country Tea Trail",
                    description="Misty mountains, colonial trains, and endless emerald tea estates across Ella and Nuwara Eliya.",
                    duration_days=5,
                    price=990,
                    rating=4.7,
                    review_count=27,
                ),
            ]
        )

    # Sample guides
    if not Guide.query.first():
        db.session.add_all(
            [
                Guide(
                    name="Chaminda Perera",
                    bio="Expert in Sri Lanka's wildlife and national parks with 12 years of field experience.",
                    experience_years=12,
                    expertise=["Wildlife", "National Parks", "Bird watching"],
                    languages=["English", "Sinhala"],
                    rating=4.9,
                    active=True,
                ),
                Guide(
                    name="Priya Seneviratne",
                    bio="Cultural heritage specialist who brings ancient stories to life at every UNESCO site.",
                    experience_years=8,
                    expertise=["Cultural Heritage", "History", "Archaeology"],
                    languages=["English", "Sinhala", "Tamil"],
                    rating=4.8,
                    active=True,
                ),
            ]
        )

    # Sample testimonials
    if not Testimonial.query.first():
        db.session.add_all(
            [
                Testimonial(
                    author_name="Sarah M.",
                    author_location="London, UK",
                    text="An absolutely magical 10 days. Our guide knew every hidden gem and made the trip extraordinary.",
                    rating=5,
                    featured=True,
                ),
                Testimonial(
                    author_name="James K.",
                    author_location="Sydney, Australia",
                    text="The cultural triangle package exceeded every expectation. Flawless organisation from start to finish.",
                    rating=5,
                    featured=True,
                ),
            ]
        )

    db.session.commit()
    print("Seed data loaded successfully.")
