#  To-Do AI PWA

A **cross-platform, AI-assisted productivity app** that intelligently prioritizes and helps complete tasks based on urgency and available time.  
Built as a **Progressive Web App (PWA)** that syncs seamlessly across **macOS, Windows, and iOS**.  

This monorepo follows **modern CI/CD standards**, uses **Next.js** for the frontend, **Fastify** for the backend, and supports **real-time data updates** with planned integrations for email, calendar, and AI automation.

---

##  Tech Stack Overview

| Layer | Technology | Purpose |
|:--|:--|:--|
| **Frontend (PWA)** | [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) | Cross-platform UI, offline-ready experience |
| **Backend (API)** | [Fastify 5](https://fastify.dev/) + TypeScript | High-performance REST API for tasks & AI logic |
| **Language & Runtime** | TypeScript + Node 23 + pnpm Workspaces | Type-safe, monorepo dependency management |
| **Tooling** | pnpm v10, tsx (dev runner), GitHub Actions (CI/CD pipeline) | Fast local dev and automated testing/deployments |
| **Infrastructure** | Docker (under `infra/docker`) + Vercel/Fly.io (future) | Local & cloud deployment environments |

---

## Monorepo Structure

```
todo-ai-pwa/
├── apps/
│   ├── api/        # Fastify backend service
│   └── web/        # Next.js PWA frontend
├── packages/
│   ├── ui/         # Shared UI components (planned)
│   └── types/      # Shared TypeScript types
├── infra/
│   └── docker/     # Deployment & containerization configs
├── .github/        # CI/CD workflows
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Development Setup (macOS & Windows)

### 1. Clone the repository
```bash
git clone https://github.com/bewarb/to-do-ai-pwa.git
cd to-do-ai-pwa
```

### 2. Install dependencies
```bash
# On both macOS & Windows
pnpm install
```

If you haven’t enabled Corepack yet:
```bash
corepack enable
```

### 3. Run the backend (API)
```bash
pnpm --filter api dev
```
Starts Fastify on http://localhost:8080

- Health check example:
```bash
curl -s http://localhost:8080/healthz
```

Response:
```json
{ "ok": true }
```

Test route: GET /tasks — returns demo tasks

### 4. Run the frontend (Web App)
In a new terminal:
```bash
pnpm --filter web dev
```
- Starts Next.js dev server on [http://localhost:3000](http://localhost:3000)
- The PWA will later fetch and display tasks from the API

### 5. Verify connectivity
```bash
curl http://localhost:8080/tasks
```
Expected output:
```json
[
  {"id":1,"title":"Build API","status":"done"},
  {"id":2,"title":"Connect frontend","status":"todo"}
]
```

### Windows: Docker Postgres port conflict

On Windows you may already have a local PostgreSQL server bound to host port 5432. That can cause tools (like `drizzle-kit` or your app) to connect to the *local* Postgres instead of the Postgres running in Docker. To avoid this conflict in this repo the Docker Postgres service is mapped to host port 5433 and the API `DATABASE_URL` in `apps/api/.env` is updated accordingly.

Quick checks and options:

- Check what is listening on port 5432 (PowerShell):

```powershell
netstat -aon | findstr 5432
Get-Process -Id <PID_FROM_NETSTAT> | Select-Object Id,ProcessName,Path
```

- If you don't need the local Postgres, stop/disable it (use Services.msc or the relevant service name). After stopping it you can revert `docker-compose.yml` back to map host port 5432 and update `apps/api/.env` to use port 5432.

- If you prefer not to stop the local Postgres, keep the Docker host mapping to 5433 (current default) — that's safe and avoids changing system services.

This note was added after diagnosing an authentication error where the app tried to connect to 127.0.0.1:5432 and hit a different Postgres instance.

### macOS: Docker Postgres port conflict (quick checks)

macOS can encounter the same issue if you run a local Postgres (Homebrew, Postgres.app) that 
binds to host port 5432. If that happens, you can either stop the local Postgres or use the 
repo fallback port 5433.

Quick checks on macOS:

```bash
# show process listening on TCP port 5432
lsof -iTCP:5432 -sTCP:LISTEN -n -P

# Homebrew-managed services
brew services list | grep postgresql

# fallback: check for postgres processes
ps aux | grep -i postgres
```

Stop or change local Postgres as needed (Homebrew example):

```bash
brew services stop postgresql
# or for a versioned formula:
brew services stop postgresql@14
```

### Windows: Fix "running scripts is disabled" npm/pnpm error

If you see this error when running npm or pnpm commands:

File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.

You need to allow trusted scripts for your current user.

Fix:

1. Open PowerShell as Administrator
2. Run:
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
3. When prompted, type A (Yes to All) and press Enter

This permanently allows PowerShell to execute trusted scripts (like npm, pnpm, and other developer tools) for your user account. It is safe and standard for Node.js development on Windows.

To revert this change later, run:
   Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope CurrentUser


---

##  Phase 1 Plan — MVP Development ( ~2 weeks )

| Goal | Deliverable | Owner | Status |
|:--|:--|:--|:--|
|  **Monorepo Scaffolding** | pnpm workspace + Next.js frontend + Fastify API | Initial Setup | **Done** |
|  **API Integration** | Connect frontend to `/tasks` endpoint and render list | Dev (Briana) | In Progress |
|  **Task Model** | CRUD operations (Create/Read/Update/Delete) for tasks | Backend | Planned |
|  **Persistence Layer** | Connect to SQLite/Postgres via Prisma ORM | Backend | Planned |
| CI/CD Pipeline | Add GitHub Actions for build + lint + test | Infra | Planned |
|  **PWA Features** | Installable, offline support, push notifications | Frontend | Planned |

**MVP Outcome:**  
A working cross-platform to-do list app that synchronizes tasks between devices and exposes a robust API foundation for future AI enhancements.

---

##  Next Phases ( Preview )

| Phase | Focus | Description |
|:--|:--|:--|
| **Phase 2** | AI Integration | Implement intelligent task prioritization using OpenAI or local LLMs to schedule work based on urgency + time availability |
| **Phase 3** | Calendar & Email Sync | Integrate Google Calendar / Outlook API and email access to automatically adjust deadlines |
| **Phase 4** | Real-Time Sync | Add WebSockets / Supabase realtime updates for multi-device consistency |
| **Phase 5** | Deployment & Monitoring | Dockerize services, deploy on Vercel/Fly.io, add metrics dashboards with Tilt and Grafana (optional) |

---

##  Developer Tips

- **Commit convention:** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `chore:` etc.)
- **Run both apps concurrently:**  
  ```bash
  pnpm --parallel dev
  ```
- **Type checking:**  
  ```bash
  pnpm --filter api typecheck
  pnpm --filter web typecheck
  ```
- **Lint / format:** (to be added in CI)  
  ```bash
  pnpm lint
  pnpm format
  ```

---

##  License & Attribution
MIT License © 2025 Briana Metalia  
All rights reserved for project branding and AI integration components.
