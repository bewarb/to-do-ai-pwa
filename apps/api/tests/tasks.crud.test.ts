import request from "supertest";
import { buildServer } from "../src/server";
import { mintTestJWT } from "./utils/jwt";

let app: Awaited<ReturnType<typeof buildServer>>;
let token: string;

beforeAll(async () => {
  app = await buildServer();
  await app.ready();
  token = mintTestJWT();
});

afterAll(async () => {
  await app.close();
});

test("CRUD: create → read → update → delete task", async () => {
  // Create
  const createRes = await request(app.server)
    .post("/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Test Task", description: "from tests", status: "todo" });
  expect(createRes.statusCode).toBe(201);
  const id = createRes.body?.id;
  expect(id).toBeTruthy();

  // Read list
  const listRes = await request(app.server)
    .get("/tasks")
    .set("Authorization", `Bearer ${token}`);
  expect(listRes.statusCode).toBe(200);
  expect(Array.isArray(listRes.body)).toBe(true);

  // Update
  const updateRes = await request(app.server)
    .patch(`/tasks/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "in_progress" });
  expect([200, 204]).toContain(updateRes.statusCode);

  // Get single
  const getRes = await request(app.server)
    .get(`/tasks/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(getRes.statusCode).toBe(200);
  expect(getRes.body?.status).toBe("in_progress");

  // Delete
  const delRes = await request(app.server)
    .delete(`/tasks/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect([200, 204]).toContain(delRes.statusCode);
});
