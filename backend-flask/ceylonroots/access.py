from functools import wraps

from flask import abort, redirect, request, url_for
from flask_login import current_user


def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.admin:
            return redirect(url_for("meta.login"))
        return f(*args, **kwargs)

    return decorated


def require_staff(permissions: list[str] = [], condition=all):
    """
    Usage:
        @require_staff(["bookings.read"])
        @require_staff(["bookings.read", "bookings.manage"], condition=any)
    """

    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for("meta.login"))
            if current_user.admin:
                return f(*args, **kwargs)
            if permissions and not condition(
                current_user.has_permission(p) for p in permissions
            ):
                abort(403)
            return f(*args, **kwargs)

        return decorated

    return decorator


def require_api_key(f):
    """Check X-API-Key header or ?api_key= for internal endpoints."""

    @wraps(f)
    def decorated(*args, **kwargs):
        from flask import current_app

        key = request.headers.get("X-API-Key") or request.args.get("api_key")
        if key != current_app.config.get("ADMIN_API_KEY"):
            abort(401)
        return f(*args, **kwargs)

    return decorated
