# MaterNova (SlayGency) - Hackathon 2026

MaterNova is a role-based maternal health platform built by Team SlayGency.
It supports patients, doctors, and admins with end-to-end workflows for health entry, risk prediction, alerts, and monitoring.

## Team

- Kushal JK
- Samana Upreti
- Pranisha Karki
- Dinisha Parajuli

## What This Project Does

- Patient registration and login (role-based)
- Patient health data entry (BP, hemoglobin, symptoms, history)
- AI-assisted risk prediction flow
- Doctor dashboard, alert center, and patient record views
- Admin monitoring for users, patients, and alerts
- English/Nepali i18n support with global language switch in app layout

## Tech Stack

- Frontend: React 18, Vite, React Router, Tailwind CSS, Axios, react-i18next
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, bcryptjs
- Tooling: ESLint, Prettier, Nodemon, Concurrently

## Repository Structure

```text
projects/Slaygency/
|- README.md
|- responsible-ai.md
|- package.json
|- src/
|  |- client/   # React + Vite frontend
|  \- server/   # Express + MongoDB backend
\- demo/
```

## Environment Variables

Create `src/server/.env` with:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/slaygency
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

Create `src/client/.env` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Locally

From `projects/Slaygency`:

```bash
npm install
npm run dev
```

App URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- API root check: `http://localhost:5000/`

## NPM Scripts

At project root:

- `npm run dev` - run frontend + backend together
- `npm run dev:server` - backend only
- `npm run dev:client` - frontend only
- `npm run build` - production build for frontend
- `npm run start` - run backend in production mode

## Main Application Routes

Public:

- `/` - landing page
- `/about` - about page
- `/login`
- `/register`

Patient:

- `/patient`
- `/patient-health-data-entry`
- `/patient-risk-assessment`
- `/my-records`
- `/health-reports`
- `/patient-settings`

Doctor:

- `/doctor`
- `/patient-records`
- `/alerts`
- `/submit`
- `/health-entry`
- `/settings`

Admin:

- `/admin/dashboard`
- `/admin/users`
- `/admin/patients`
- `/admin/alerts`

## API Overview

Base URL: `/api`

- Auth: `/auth/register`, `/auth/login`, `/auth/me`, password routes
- Health records: `/health` (create, list, update)
- Risk: `/risk/predict`, `/risk/health`
- Patients: `/patients`, `/patients/:id` (doctor/admin)
- Alerts: `/alerts`, `/alerts/:id/resolve` (doctor/admin)
- Dashboard: `/dashboard/stats` (doctor/admin)
- Users (admin): `/users/admin`, `/users/admin/:userId`, etc.

## Demo Flow (Recommended)

1. Start at landing page (`/`)
2. Show About page and team contributors
3. Register/Login for each role
4. Patient logs health data and views risk/report
5. Doctor reviews patient records and alerts
6. Admin reviews system-level dashboard/users/patients/alerts

## Notes

- If MongoDB is not running, backend endpoints will fail.
- Auth-protected pages redirect unauthenticated users to `/`.
- Some legacy components exist in the codebase but the current app uses the unified role-based layout.
