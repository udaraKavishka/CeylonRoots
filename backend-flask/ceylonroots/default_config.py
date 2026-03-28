DEBUG = False
TESTING = False
SECRET_KEY = "change-me-in-production"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/ceylonroots"
SERVER_NAME = "localhost:5001"
APP_URL = "http://localhost:5001"

# JWT
JWT_SECRET_KEY = "change-jwt-secret-in-production"
JWT_TOKEN_LOCATION = ["headers"]
JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours

# Mail
MAIL_SERVER = "localhost"
MAIL_PORT = 1025
MAIL_USE_TLS = False
MAIL_DEFAULT_SENDER = "CeylonRoots <system@ceylonroots.com>"
ADMIN_EMAIL = "admin@ceylonroots.com"

# Admin API key for internal/server-to-server calls
ADMIN_API_KEY = "change-me"

# Flask-Caching
CACHE_TYPE = "SimpleCache"
CACHE_DEFAULT_TIMEOUT = 300

# File storage (MinIO / GCS)
OBJ_CDN_TYPE = "LOCAL"
GS_OBJ_BUCKET_NAME = ""
GS_OBJ_ACCESS_KEY_ID = ""
GS_OBJ_SECRET_ACCESS_KEY = ""
