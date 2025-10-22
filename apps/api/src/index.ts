import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import taskRoutes from "./routes/tasks";


async function main() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  });

  app.get("/healthz", async () => ({
    ok: true,
    ts: new Date().toISOString(),
  }));

  await app.register(taskRoutes);

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen({ port, host });
  console.log(`GOOD - Server running at http://${host}:${port}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
