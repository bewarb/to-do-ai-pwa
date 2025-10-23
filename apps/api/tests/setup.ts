// apps/api/tests/setup.ts
import * as path from "node:path";
import * as process from "node:process";
import * as cp from "node:child_process";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

import { db } from "../src/db/client";
import { sql } from "drizzle-orm";

function run(cmd: string) {
  cp.execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
}

beforeAll(async () => {
  console.log("Setting up test database...");
  run("pnpm --filter @todo/api run db:push:test");
});

beforeEach(async () => {
  // Truncate all app tables here as you add them (or do all at once if you use schemas)
  await db.execute(sql`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE;`);
});

