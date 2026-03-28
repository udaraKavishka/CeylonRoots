import os


class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "change-this-in-production")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True
