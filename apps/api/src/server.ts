// api/src/server.ts
import "dotenv/config";              // load .env
import { buildApp } from "./app";

async function start() {
  const app = await buildApp();
  const port = Number(process.env.PORT || 4000);
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
    app.log.info(`API listening on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
