# CLAUDE.md — CeylonRoots Flask Backend

This file provides guidance to Claude Code when working with this backend.

## Project Overview

Flask-based admin backend for the CeylonRoots travel platform. Provides:
- Admin UI (Jinja2 + Bootstrap 5) for managing all travel content
- REST API (`/api/*`) consumed by the Next.js frontend
- JSON-driven form submission engine (`submissions.json`)

## Common Development Commands

### Environment Setup
```bash
uv sync --all-extras
pre-commit install
cp local.cfg.example local.cfg   # Edit with your DB credentials
```

### Database
```bash
createdb ceylonroots              # (skip if sharing with Next.js)
flask db upgrade                  # Apply migrations
flask initdb                      # Or create tables directly (dev only)
flask create-admin                # Bootstrap admin user
python seed.py                    # Load sample data
```

### Run Dev Server
```bash
flask run -p 5001
# or
make dev
```

### Migrations (after model changes)
```bash
flask db migrate -m "description"
flask db upgrade
```

### Form Definitions
```bash
flask generate-submission-meta    # Reload submissions.json (clears cache)
```

### Email Testing
```bash
mailpit                           # Local SMTP + UI at localhost:8025
flask test-email you@example.com
```

### Testing
```bash
pytest
```

## Architecture

### Application Package: `ceylonroots/`
- `__init__.py` — App factory `create_app()`, extension init, blueprint registration
- `models.py` — All SQLAlchemy models (mirrors the Prisma schema in `../ceylonroots/prisma/schema.prisma`)
- `utils.py` — Email helpers, WTForms validators, Jinja2 filters
- `access.py` — Auth decorators: `@require_admin`, `@require_staff(perms)`, `@require_api_key`
- `default_config.py` — Default config values (overridden by `local.cfg`)

### Blueprint Structure
| Blueprint | Routes | Purpose |
|---|---|---|
| `meta` | `/login`, `/logout` | Authentication |
| `main` | `/` | Admin dashboard + stats |
| `packages` | `/packages/*` | Travel package CRUD |
| `bookings` | `/bookings/*` | Booking management |
| `destinations` | `/destinations/*` | Travel component CRUD |
| `guides` | `/guides/*` | Tour guide CRUD |
| `gallery` | `/gallery/*` | Gallery management |
| `blog` | `/blog/*` | Blog post + comment management |
| `reviews` | `/reviews/*` | Review moderation |
| `testimonials` | `/testimonials/*` | Testimonial management |
| `submissions` | `/submit/<code>`, `/admin/submissions/*` | JSON-driven form engine |
| `api` | `/api/*` | REST API for the Next.js frontend |

### Submissions Engine (`submissions.json`)
All public-facing forms are defined in `submissions.json`. Each entry has:
- `code` — URL slug (`/submit/<code>`)
- `name` — Display name
- `fields` — Array of field definitions with type, required, min/max, choices
- `notify_admin` — Whether to email admin on submission
- `notify_user_field` — Field name to send user confirmation to (optional)

Field types: `string`, `text`, `email`, `phone`, `integer`, `choice`

To add a new form: edit `submissions.json`, run `flask generate-submission-meta`.
Submissions are stored in the `submission` table with JSONB `data`.

### Database Tables
The Flask backend adds two admin-only tables to the existing database:
- `admin_user` — Backend admin/staff accounts
- `admin_role` — RBAC roles with permission arrays
- `submission` — Generic JSON form submissions
- `contact` — Contact form entries

All other tables (`TravelPackage`, `Booking`, `Review`, etc.) mirror the Prisma schema exactly.

### REST API
`/api/*` — JSON responses, JWT auth for write operations.
API key (`X-API-Key` header) required for internal admin endpoints.

The Next.js frontend should set `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api`.

## Pre-commit Hooks

Commits trigger:
1. **ruff `--fix`** — auto-fixes lint/import issues, then blocks if unfixable errors remain
2. **ruff-format** — enforces consistent formatting
3. **pyright** — type checking (blocks on errors)
4. **djLint** — auto-reformats Jinja2 templates in `ceylonroots/templates/`
5. **compile-requirements** — regenerates `requirements.txt` from `pyproject.toml`

If a commit fails due to auto-fixes, re-stage the changed files and re-commit.

## Development Workflow

```bash
# Typical session
make dev           # Start dev server at localhost:5001
mailpit            # Start local email server (separate terminal)

# After model changes
make migrate msg="add new field"

# After editing submissions.json
make reload-forms
```

## Configuration Variables
See `local.cfg.example` for all available options. Key vars:
- `SQLALCHEMY_DATABASE_URI` — PostgreSQL connection
- `SERVER_NAME` — Required for Flask URL generation (e.g. `localhost:5001`)
- `JWT_SECRET_KEY` — JWT signing secret
- `ADMIN_EMAIL` — Where admin notifications are sent
- `ADMIN_API_KEY` — API key for internal endpoints
