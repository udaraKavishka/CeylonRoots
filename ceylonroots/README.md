# CeylonRoots Monorepo (Next.js + Flask Admin)

This project has two apps using the same PostgreSQL database:

- Next.js frontend for users: `http://localhost:3000`
- Flask admin panel: `http://admin.localhost:3001`

## Local Setup

1. Ensure `admin.localhost` resolves to local machine:

```bash
sudo sh -c 'echo "127.0.0.1 admin.localhost" >> /etc/hosts'
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install Flask admin dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r admin-panel/requirements.txt
```

4. Ensure `.env.local` contains valid values for:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3001`
- `FLASK_SECRET_KEY`
- `ADMIN_SIGNUP_KEY`

## Run Apps

Frontend (Next.js):

```bash
npm run dev
```

Admin (Flask):

```bash
source .venv/bin/activate
npm run dev:admin
```

Optional (both together):

```bash
npm run dev:all
```

## Admin Flow

1. Visit `http://admin.localhost:3001/auth/login`.
2. Login with an existing admin user (`role=admin`) from the shared `user` table.
3. If needed, create an admin via `/auth/signup` with `ADMIN_SIGNUP_KEY`.
4. Use module pages to manage:
   - Packages + itinerary
   - Guides
   - Destinations
   - Gallery
   - Departures
   - Bookings (status updates)

All writes update PostgreSQL and are reflected in Next.js frontend pages.

## Frontend-Only Content

- Blog is rendered from `content/blog/*.mdx` and Next.js blog pages.
- Testimonials are rendered from `app/data/testimonials.ts` and frontend components/pages.
- Blog and testimonial content is intentionally not managed from Flask admin.
