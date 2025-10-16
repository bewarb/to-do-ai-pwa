import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

// Allow frontend (Next.js) to call your API
await app.register(cors, { origin: true });

// Health check route
app.get("/healthz", async () => ({ ok: true }));

// ✅ Test route for now
app.get("/tasks", async () => [
  { id: 1, title: "Build API", status: "done" },
  { id: 2, title: "Connect frontend", status: "todo" },
]);

// Server start
const port = Number(process.env.PORT || 8080);
const host = "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
