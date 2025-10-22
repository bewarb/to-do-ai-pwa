import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import tasksRoutes from "./routes/tasks";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(","),
    credentials: true,
  });

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || "changeme",
  });

  app.decorate("authenticate", async (req: any, reply: any) => {
    try {
      await req.jwtVerify();
    } catch {
      return reply.code(401).send({ error: "Unauthorized" });
    }
  });

  app.get("/healthz", async () => ({
    ok: true,
    ts: new Date().toISOString(),
  }));

  app.get("/", async () => ({
    up: true,
    service: "todo-api",
    version: "1.0.0",
  }));

  app.register(tasksRoutes, { prefix: "/tasks" });

  return app;
}
