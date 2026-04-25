# SlayGency MERN Starter (Hackathon 2026)

A production-ready MERN starter scaffold aligned with the CareDevi hackathon repository requirements.

## Team
- Team Name: SlayGency
- Members: Add names + GitHub handles

## Project Structure

```text
projects/slaygency-mern/
├── README.md
├── responsible-ai.md
├── package.json
├── .gitignore
├── .editorconfig
├── .eslintrc.cjs
├── .prettierrc
├── docker-compose.yml
├── demo/
│   └── README.md
└── src/
    ├── server/
    │   ├── package.json
    │   ├── .env.example
    │   └── src/
    │       ├── app.js
    │       ├── index.js
    │       ├── config/
    │       │   └── db.js
    │       ├── controllers/
    │       │   └── health.controller.js
    │       ├── middleware/
    │       │   ├── error.middleware.js
    │       │   └── notFound.middleware.js
    │       ├── models/
    │       │   └── User.js
    │       └── routes/
    │           ├── health.routes.js
    │           └── user.routes.js
    └── client/
        ├── package.json
        ├── index.html
        ├── vite.config.js
        ├── .env.example
        ├── public/
        │   └── vite.svg
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── api.js
            ├── index.css
            ├── app.css
            └── components/
                └── Navbar.jsx
```

## Included Stack
- Frontend: React 18, Vite, React Router, Axios
- Backend: Node.js, Express 5, Mongoose, JWT, bcryptjs, Helmet, CORS, Morgan
- Tooling: ESLint, Prettier, Nodemon, Concurrently
- DB: MongoDB (local or Docker)

## Quick Start

1. Install dependencies from project root:

```bash
npm install
```

2. Copy environment files:

```bash
copy src\server\.env.example src\server\.env
copy src\client\.env.example src\client\.env
```

3. Start MongoDB (optional via Docker):

```bash
docker compose up -d
```

4. Run both client and server:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

## Available Scripts
- `npm run dev` - run server and client together
- `npm run dev:server` - run backend only
- `npm run dev:client` - run frontend only
- `npm run lint` - lint all packages
- `npm run format` - format all packages
- `npm run build` - build frontend

## Hackathon Deliverables Checklist
- [ ] Frequent commits
- [ ] Fill this README with project problem/approach/architecture/data/setup/team
- [ ] Upload demo assets to `demo/`
- [ ] Complete `responsible-ai.md`
