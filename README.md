# DIMENSION & CO Design Platform

A full-stack React and Express platform for DIMENSION & CO, an interior design and metal-glass fabrication studio led by Suvankar Dey. It includes a premium marketing site, service catalogue, portfolio CMS, lead capture, admin dashboard, WhatsApp handoff, and an optional Gemini-powered design co-pilot.

## Features

- Luxury studio homepage with responsive navigation
- Service catalogue for interior design and fabrication work
- Before/after project portfolio with detail modals
- Contact form with API lead capture and optional WhatsApp handoff
- Admin portal for leads, projects, blogs, and testimonials
- Gemini AI design co-pilot with local fallback output
- File-backed local datastore for prototype use

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Express
- Google GenAI SDK
- Lucide icons

## Local Setup

> Important on Windows: avoid `&` in the project folder name. Rename this folder from `interior-design-&-fabrication` to `interior-design-fabrication` before running npm scripts.

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set your values:

```bash
cp .env.example .env
```

Required before sharing the admin portal:

```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="replace-with-a-strong-password"
VITE_WHATSAPP_NUMBER="919851451319"
```

Optional AI co-pilot:

```env
GEMINI_API_KEY="your_gemini_api_key"
GEMINI_MODEL="gemini-2.5-flash"
```

3. Start development:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Notes

- `server_data.json` is intentionally ignored because it can contain leads and private CMS content.
- The file-backed datastore is suitable for demos and prototypes. Use PostgreSQL, MongoDB, Supabase, or Firebase before production.
- Admin sessions are in memory, so all sessions expire when the server restarts.
- Do not deploy without setting strong admin credentials in environment variables.
