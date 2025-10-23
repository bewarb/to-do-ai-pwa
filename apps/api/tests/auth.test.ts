import request from "supertest";
import { buildServer } from "../src/server";
import { mintTestJWT } from "./utils/jwt";

let app: Awaited<ReturnType<typeof buildServer>>;

beforeAll(async () => {
  app = await buildServer();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("Protected /tasks requires JWT", async () => {
  const res = await request(app.server).get("/tasks");
  expect(res.statusCode).toBeGreaterThanOrEqual(401);
});

test("Protected /tasks works with valid JWT", async () => {
  const token = mintTestJWT();
  const res = await request(app.server)
    .get("/tasks")
    .set("Authorization", `Bearer ${token}`);
  expect([200, 204]).toContain(res.statusCode);
});
