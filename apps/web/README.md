# To-Do AI PWA – Frontend (/apps/web)

This is the frontend of the To-Do AI Progressive Web App (PWA), built with Next.js 15, React 19, Tailwind CSS 4, and ShadCN UI.  
It connects to a Fastify + Drizzle + PostgreSQL backend and provides the user-facing task management interface.

---

## Features

### Phase 3 – Completed
- Connected Tasks page using React Query + Axios (CRUD with optimistic create)
- Dark/light theme switching via `next-themes`
- Responsive, accessible UI built with ShadCN UI
- Smooth animations using Framer Motion
- Consistent design system and color palette
- Calendar and time pickers implemented (UI only, not yet persisted)

### Phase 4 and Later – Planned
- Persist due date and time to the backend
- Task completion toggle (PATCH `/tasks/:id`)
- Toast feedback using `sonner`
- Skeleton loading states
- PWA installability and offline caching

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | ShadCN UI |
| State/Data | React Query v5 + Axios |
| Animations | Framer Motion v11 |
| Theme | next-themes |
| Package Manager | pnpm 8 |
| Environment | Monorepo with `/apps/api` backend |

---

## Directory Structure

web/
├── components/
│   ├── TodoList.tsx          # Main task list component
│   ├── SignIn.tsx            # Placeholder for unauthenticated users
│   ├── Providers.tsx         # React Query + Theme providers
│   └── ui/                   # ShadCN UI components
├── lib/
│   ├── api.ts                # Axios instance / API client
│   └── tasks.ts              # React Query hooks for CRUD
├── src/app/
│   ├── layout.tsx            # Root layout with Providers
│   ├── page.tsx              # Landing page
│   └── tasks/
│       ├── page.tsx          # Tasks route entry
│       └── view.tsx
└── tailwind.config.ts

---

## Getting Started

1. Install dependencies

   pnpm install

2. Create environment file

   Create `.env.local` in `/apps/web`:

   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

3. Run the development server

   pnpm dev --filter @todo/web

   Then open http://localhost:3000.

4. Run the backend (from project root)

   pnpm dev --filter @todo/api

   Ensure Postgres is running:

   docker compose up -d

---

## Development Notes

- UI components are located in `/components/ui` (generated with `shadcn add`).
- Global providers for React Query and themes are set in `Providers.tsx`.
- API logic is abstracted into `/lib/api.ts` and `/lib/tasks.ts`.
- Use `motion.div` for transitions and subtle animations.
- The project uses strict TypeScript settings and lint rules shared across the monorepo.

---

## Build and Deploy

To build for production:

pnpm build --filter @todo/web
pnpm start --filter @todo/web

Set production environment variables:

NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

This app can be deployed on Vercel or any Next.js-compatible hosting platform.

---

## Phase Milestones

| Phase | Title | Status |
|-------|--------|--------|
| 1 | Persistence & Env | Done |
| 2 | Auth & Tasks CRUD API | Done |
| 3 | Frontend Tasks Screen | Done |
| 4 | PWA Install + Offline + Polish | Upcoming |
| 5 | Real-Time Sync | Upcoming |
| 6 | AI Assist (Prioritization) | Upcoming |
| 7 | CI + Tests + Quality Gates | Upcoming |
| 8 | Production Deploy | Upcoming |

---

## Summary

The `/apps/web` project delivers a production-ready MVP for task management:  
a connected, theme-aware, animated interface that synchronizes with the Fastify backend.  
Phase 4 will extend persistence for date/time, add offline behavior, and polish the PWA experience.
