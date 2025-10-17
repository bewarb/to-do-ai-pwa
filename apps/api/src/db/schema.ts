/* stylelint-disable */
import { pgTable, serial, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("task_status", ["todo", "in_progress", "done"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: statusEnum("status").notNull().default("todo"),
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});