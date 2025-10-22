# @todo/api — Fastify + Drizzle ORM Backend

This service provides a JWT-protected Tasks CRUD API built with Fastify 5 and Drizzle ORM, connected to a PostgreSQL database.

---

## Getting Started

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure the following variables:
```env
DATABASE_URL=postgres://todo:todo@127.0.0.1:5433/todo
JWT_SECRET=dev-super-secret-change-me
CORS_ORIGIN=http://localhost:3000
PORT=4000
```

**Security Note:** Change `JWT_SECRET` to a strong random value in production environments.

### 2. Installation and Running

From the repository root:
```bash
pnpm install
pnpm --filter @todo/api dev
```

The API starts on `http://localhost:4000`

Verify the service is running:
```bash
curl http://localhost:4000/healthz
```

Expected response:
```json
{"ok":true}
```

---

## Database Management

All database commands should be run from the repository root:

| Command | Description |
|---------|-------------|
| `pnpm --filter @todo/api run db:generate` | Generate migration files from schema changes |
| `pnpm --filter @todo/api run db:push` | Apply schema directly to the database (development) |
| `pnpm --filter @todo/api run db:studio` | Open Drizzle Studio web interface |
| `pnpm --filter @todo/api run db:seed` | Populate database with sample task data |

**Note:** Use `db:push` for rapid development iteration. For production deployments, use `db:generate` to create versioned migration files.

---

## Authentication (JWT)

All `/tasks` routes require a valid JWT token in the `Authorization` header.

### Generating a Development Token
```bash
pnpm --filter @todo/api run mint:jwt
```

Copy the generated token and export it as an environment variable:
```bash
# macOS/Linux
export JWT='PASTE_TOKEN_HERE'

# Windows (PowerShell)
$env:JWT='PASTE_TOKEN_HERE'
```

Use this token in the `Authorization` header for all authenticated requests.

---

## API Endpoints

| Method | Route | Auth Required | Description |
|---------|--------|--------------|-------------|
| GET | `/healthz` | No | Health check endpoint |
| GET | `/tasks` | Yes | Retrieve all tasks for the authenticated user |
| POST | `/tasks` | Yes | Create a new task |
| PATCH | `/tasks/:id` | Yes | Update an existing task |
| DELETE | `/tasks/:id` | Yes | Delete a task |

### Request Examples

**List all tasks**
```bash
curl -H "Authorization: Bearer $JWT" \
  http://localhost:4000/tasks
```

**Create a new task**
```bash
# macOS/Linux
curl -X POST http://localhost:4000/tasks \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"title":"New task","status":"todo"}'

# Windows (PowerShell)
Invoke-RestMethod -Uri http://localhost:4000/tasks -Method Post `
  -Headers @{"Authorization"="Bearer $env:JWT"} `
  -ContentType "application/json" `
  -Body '{"title":"New task","status":"todo"}'
```

**Update a task**
```bash
# macOS/Linux
ID=1
curl -X PATCH http://localhost:4000/tasks/$ID \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Windows (PowerShell)
$ID=1
Invoke-RestMethod -Uri "http://localhost:4000/tasks/$ID" -Method Patch `
  -Headers @{"Authorization"="Bearer $env:JWT"} `
  -ContentType "application/json" `
  -Body '{"status":"done"}'
```

**Delete a task**
```bash
# macOS/Linux
curl -X DELETE http://localhost:4000/tasks/$ID \
  -H "Authorization: Bearer $JWT"

# Windows (PowerShell)
Invoke-RestMethod -Uri "http://localhost:4000/tasks/$ID" -Method Delete `
  -Headers @{"Authorization"="Bearer $env:JWT"}
```

### Response Formats

**Success Response (200/201)**
```json
{
  "id": 1,
  "title": "New task",
  "description": null,
  "status": "todo",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

**Error Response (400/401/404)**
```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "No Authorization was found in request.headers"
}
```

---

## Development Scripts

| Script | Purpose |
|---------|----------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run compiled server from `dist/` |
| `pnpm typecheck` | Run TypeScript type checking without building |
| `pnpm db:*` | Database management commands (see table above) |
| `pnpm mint:jwt` | Generate a development JWT token |

---

## Current Implementation Status

**Completed Features:**
- JWT authentication with `@fastify/jwt`
- Full CRUD operations for tasks endpoint
- Health check monitoring endpoint
- Database seeding utilities
- Development token generation
- CORS configuration for web client integration

**Next Steps:**
- User registration and login endpoints
- Task filtering and sorting
- Task priority and due date fields
- Shared tasks and collaboration features