/* stylelint-disable */
import type { Config } from "drizzle-kit";
import "dotenv/config";

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Current directory:', process.cwd());

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;