// api/src/routes/tasks.ts
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { db } from "../db/client";
import { tasks } from "../db/schema";
import { desc, eq } from "drizzle-orm";

// 1) Match DB enum exactly
const StatusEnum = z.enum(["todo", "in_progress", "done"]);

// 2) Zod schemas that fit DB (description often nullable in DB)
const CreateTask = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().trim().optional(), // we'll map to null if missing/empty
  status: StatusEnum.optional().default("todo"),
});

const PatchTask = z.object({
  title: z.string().min(1).optional(),
  description: z.string().trim().optional(),
  status: StatusEnum.optional(),
});

const routes: FastifyPluginAsync = async (app) => {
  // 3) Use (app as any).authenticate if you don't have a .d.ts augmentation yet
  app.addHook("preHandler", (req, reply) =>
    (app as any).authenticate(req, reply)
  );

  // GET /tasks
  app.get("/", async () => {
    // If you have createdAt in schema, this orderBy is nice; otherwise remove it
    return db.select().from(tasks).orderBy(desc(tasks.createdAt));
  });

  // POST /tasks
  app.post("/", async (req, reply) => {
    const parsed = CreateTask.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .code(422)
        .send({ error: "Invalid body", issues: parsed.error.issues });
    }

    // 4) Build an insert payload that matches the Drizzle table exactly
    const toInsert: typeof tasks.$inferInsert = {
      title: parsed.data.title,
      // many schemas use NULL for optional text fields:
      description:
        parsed.data.description && parsed.data.description.length > 0
          ? parsed.data.description
          : null,
      status: parsed.data.status, // "todo" | "in_progress" | "done"
      // isArchived/createdAt/updatedAt will default in DB if defined that way
    };

    const [row] = await db.insert(tasks).values(toInsert).returning();
    return reply.code(201).send(row);
  });

  // PATCH /tasks/:id
  app.patch("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    if (!Number.isFinite(id)) {
      return reply.code(400).send({ error: "Invalid id" });
    }

    const parsed = PatchTask.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .code(422)
        .send({ error: "Invalid body", issues: parsed.error.issues });
    }

    // 5) Build a partial update payload that matches your insert type
    const toUpdate: Partial<typeof tasks.$inferInsert> = {};
    if (parsed.data.title !== undefined) toUpdate.title = parsed.data.title;
    if (parsed.data.status !== undefined) toUpdate.status = parsed.data.status;
    if (parsed.data.description !== undefined) {
      toUpdate.description =
        parsed.data.description.length > 0 ? parsed.data.description : null;
    }
    // if you maintain updatedAt in app code:
    // toUpdate.updatedAt = new Date();

    const [row] = await db
      .update(tasks)
      .set(toUpdate)
      .where(eq(tasks.id, id))
      .returning();

    if (!row) return reply.code(404).send({ error: "Not found" });
    return reply.send(row);
  });

  // DELETE /tasks/:id
  app.delete("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    if (!Number.isFinite(id)) {
      return reply.code(400).send({ error: "Invalid id" });
    }

    const [row] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    if (!row) return reply.code(404).send({ error: "Not found" });

    return reply.code(204).send();
  });
};

export default routes;
