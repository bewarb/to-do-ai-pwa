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

## ️ Monorepo Structure

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

## ⚙️ Development Setup ( macOS & Windows )

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/bewarb/to-do-ai-pwa.git
cd to-do-ai-pwa
```

### **2️⃣ Install dependencies**
```bash
# On both macOS & Windows
pnpm install
```

If you haven’t enabled Corepack yet:
```bash
corepack enable
```

### **3️⃣ Run the backend (API)**
```bash
pnpm --filter api dev
```
- Starts Fastify on [http://localhost:8080](http://localhost:8080)
- Health check: `GET /healthz → { "ok": true }`
- Sample route: `GET /tasks → returns demo tasks`

### **4️⃣ Run the frontend (Web App)**
In a new terminal:
```bash
pnpm --filter web dev
```
- Starts Next.js dev server on [http://localhost:3000](http://localhost:3000)
- The PWA will later fetch and display tasks from the API

### **5️⃣ Verify connectivity**
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

---

##  Phase 1 Plan — MVP Development ( ~2 weeks )

| Goal | Deliverable | Owner | Status |
|:--|:--|:--|:--|
|  **Monorepo Scaffolding** | pnpm workspace + Next.js frontend + Fastify API | Initial Setup | **Done** |
|  **API Integration** | Connect frontend to `/tasks` endpoint and render list | Dev (Briana) | In Progress |
|  **Task Model** | CRUD operations (Create/Read/Update/Delete) for tasks | Backend | Planned |
|  **Persistence Layer** | Connect to SQLite/Postgres via Prisma ORM | Backend | Planned |
| ⚙️ **CI/CD Pipeline** | Add GitHub Actions for build + lint + test | Infra | Planned |
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
