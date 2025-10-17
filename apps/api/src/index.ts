import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { taskRoutes } from "./routes/tasks";

const app = Fastify({ logger: true });

// Allow frontend (Next.js) to call your API
await app.register(cors, { 
  origin: process.env.CORS_ORIGIN ?? true 
});

// Health check route
app.get("/healthz", async () => ({ ok: true }));

// Register task routes (connected to database)
await app.register(taskRoutes);

// Server start
const port = Number(process.env.PORT ?? 4000);
const host = "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});