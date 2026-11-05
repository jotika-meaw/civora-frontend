# CIVORA — Social Development Events Platform

CIVORA is a community-driven platform where people create, join and track social service events in their local area, from winter clothes distribution in Mirpur to tree plantation drives in Chattogram.

**Live site:** https://civora-frontend-jotika.vercel.app
**API server:** https://civora-backend-five.vercel.app

## Features

- **Email/password and Google login** with Better Auth (MongoDB adapter), password rules (uppercase, lowercase, 6+ chars) and toast feedback.
- **Create events** with a validated form: title, description, event type (Cleanup, Plantation, Donation…), thumbnail, location and a future-only date.
- **Upcoming events explorer** that only lists future events, with search by name, category and location filters, and date sorting.
- **Public event details with one-click join**; joining requires login and each user can join an event only once.
- **Manage Events dashboard** to update or delete only the events you created, enforced by JWT-protected, owner-checked APIs.
- **Joined Events history** sorted by event date, plus a profile page to update your name and photo and see your impact stats.
- **Light/dark theme toggle**, loading skeletons and a fully responsive layout for mobile, tablet and desktop.

## Tech stack

Next.js (App Router) · Tailwind CSS + DaisyUI · Better Auth (MongoDB adapter + JWT plugin) · React Hook Form + Zod · Express + MongoDB (server)

## Routes

`/`, `/login`, `/register`, `/events`, `/events/[id]`, `/create-event`, `/manage-events`, `/joined-events`, `/profile`

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Env:
- `NEXT_PUBLIC_API_URL` — Express URL
- `NEXT_PUBLIC_APP_URL` / `BETTER_AUTH_URL` — this app URL
- `MONGODB_URI` — same DB as server (Better Auth `user` collection)
- `BETTER_AUTH_SECRET` — min 32 chars, shared with server fallback
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `JWT_ISSUER`, `JWT_AUDIENCE` — must match server

Backend JWTs come from `GET /api/auth/token`; Express verifies them via JWKS at `/api/auth/jwks`.
