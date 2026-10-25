# Prompt Hub

My follow-along code for the YouTube course **[« Deviens un PRO sur Angular en 4 heures (+ mes secrets de Lead Dev) »](https://www.youtube.com/watch?v=3llJm3LO1e4)** by [Gaëtan Rouziès | Angular Lead](https://www.youtube.com/@GaetanRouzies).

**Prompt Hub** is a small app for sharing and discovering AI prompts — list, create, edit, vote, and browse by category. It's built as a realistic, company-like setup to learn modern Angular (standalone components, signals, zoneless, forms, routing, guards, auth) against a real REST API.

This is a learning workspace, not the original source. Credit for the project and the teaching goes to the course author (original repos linked below).

## Structure

This is a monorepo with two parts:

| Folder | Stack | Port | Description |
|--------|-------|------|-------------|
| [`prompt-hub-backend/`](prompt-hub-backend/) | NestJS 11 + JWT | `3000` | REST API (prompts, categories, auth). Data stored in a local JSON file (`data/db.json`). |
| [`prompt-hub-frontend/`](prompt-hub-frontend/) | Angular 21 | `4201` | The web app that consumes the API. |

## Prerequisites

- Node.js (v20+; developed on v24)
- npm

## Running the project

Run the two parts in **separate terminals** — the frontend needs the backend up.

### 1. Backend (NestJS, port 3000)

```bash
cd prompt-hub-backend
npm install
npm run start:dev        # no auth — create / edit / vote without logging in
# or
npm run start:auth:dev   # auth on — JWT required to create / edit / vote
```

- API docs (Swagger): http://localhost:3000/api
- The `AUTH_ENABLED` env var toggles auth; the npm scripts above set it for you.

### 2. Frontend (Angular, port 4201)

```bash
cd prompt-hub-frontend
npm install
npm start
```

Open http://localhost:4201/

## Course parts / branches

In the author's original frontend repo, each part of the course has its own starting branch
(`base-1-and-2` → `base-7`, plus `final`). That branch history is **not** kept in this repo — it's a
single fresh repo. To get a specific starting point, pull it from the original:

```bash
git remote add upstream https://github.com/GaetanRouzies/prompt-hub-frontend.git
git fetch upstream
git checkout upstream/base-3   # e.g. "Librairie et UX/UI"
```

| Branch | Part | Topic |
|--------|------|-------|
| `base-1-and-2` | 1 & 2 | Concepts & displaying data |
| `base-3` | 3 | Component library & UX/UI |
| `base-4` | 4 | Back-end requests |
| `base-5` | 5 | Forms & routing |
| `base-6` | 6 | Authentication |
| `base-7` | 7 | Finishing touches |
| `final` | — | Completed project (reference) |

## Credits & original sources

- **Course:** [Gaëtan Rouziès — Angular en 4 heures](https://www.youtube.com/watch?v=3llJm3LO1e4)
- **Original backend:** https://github.com/GaetanRouzies/prompt-hub-backend
- **Original frontend:** https://github.com/GaetanRouzies/prompt-hub-frontend
