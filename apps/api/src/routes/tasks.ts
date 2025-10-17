import { FastifyInstance } from "fastify";
import { db } from "../db/client";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function taskRoutes(app: FastifyInstance) {
  app.get("/tasks", async () => {
    return await db.select().from(tasks).where(eq(tasks.isArchived, false));
  });

  const CreateTask = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  });

  app.post("/tasks", async (req, reply) => {
    const body = CreateTask.parse(req.body);
    const [row] = await db
      .insert(tasks)
      .values({ title: body.title, description: body.description ?? null })
      .returning();
    reply.code(201);
    return row;
  });
}