import "dotenv/config";
import { db } from "../src/db/client";
import { tasks } from "../src/db/schema";
import { count } from "drizzle-orm";

async function main() {
  const [{ c }] = await db.select({ c: count() }).from(tasks);
  if (Number(c) > 0) {
    console.log(`Seed skipped: ${c} existing rows`);
    return;
  }
  const now = new Date();
  await db.insert(tasks).values([
    { title: "Wire JWT auth", status: "todo",        description: "Protect /tasks",              /* createdAt: now */ },
    { title: "CRUD endpoints", status: "in_progress", description: "POST/PATCH/DELETE routes",  /* createdAt: now */ },
    { title: "Connect frontend", status: "todo",     description: "Render tasks in Next.js",     /* createdAt: now */ },
  ]);
  console.log("Seeded sample tasks ");
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
