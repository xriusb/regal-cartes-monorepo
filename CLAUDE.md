# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands can be run from the repo root:

```bash
npm run dev          # Start frontend Vite dev server (port 5173)
npm run build        # Build frontend (vite) + backend (tsc) across all workspaces
npm run lint         # ESLint in both workspaces
npm run typecheck    # tsc --noEmit in both workspaces
```

Per-workspace:
```bash
npm run dev --workspace=apps/frontend
npm run dev --workspace=apps/backend   # tsc build + node --watch dist/index.js
```

There are no tests — no test framework is set up.

## Architecture

This is an npm workspaces monorepo with two apps: `apps/frontend` and `apps/backend`. The `packages/` directory is empty and reserved for future shared libraries.

### Backend (`apps/backend`)

Uses **Hono** (HTTP framework) + **Mongoose** (MongoDB ODM) + TypeScript compiled to `dist/` via `tsc` (NodeNext resolution).

Follows clean architecture with four layers:

- **`domain/`** — Pure domain entities (`Scoring`, `Score`) and the `ScoringRepository` interface. `Score` is a value object that validates integers 0–10 or null.
- **`application/`** — Use cases (`GetAllScorings`, `GetScoringsByContestant`, `UpdateScoring`). Each is a class with a single `execute()` method. They take the repository via constructor injection and return plain DTOs.
- **`infrastructure/`** — `MongooseScoringRepository` implements the domain interface. `ScoringMongooseModel` defines the Mongoose schema.
- **`api/`** — Hono route handlers. No business logic here, only call use cases.

Dependency injection is manual, wired at startup in `index.ts`.

Environment variables (in `apps/backend/.env`): `MONGODB_URI`, `PORT`, `ALLOWED_ORIGINS`.

API routes:
- `GET /api/scorings`
- `GET /api/contestants/:contestant/scorings`
- `PUT /api/scorings/:id`

### Frontend (`apps/frontend`)

Uses **React 19** + **Vite** + **Tailwind CSS v4** + TypeScript.

**No routing library** — the only "navigation" is toggling a `contestant` string in `App.tsx` root state (null = logged out, string = logged in). There is no React Router or similar.

**No global state** — everything is local `useState`. No Redux, Zustand, etc.

**No data-fetching library** — plain `useEffect` + `fetch` calls made directly inside components and pages. The API base URL is controlled by the `VITE_API_URL` environment variable.

**Auth is entirely client-side**: username/password pairs are hardcoded in `LoginForm.tsx`. There is no session, token, or cookie — the logged-in state lives only in React component state and is lost on page refresh.

The app is a restaurant scoring tool where contestants rate restaurants across four dimensions: place (espai), food (menjar), service (servei), and price (preu) — all integers 0–10 or null.