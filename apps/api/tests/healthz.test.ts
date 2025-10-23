import request from "supertest";
import { buildServer } from "../src/server"; // adjust import to where you build and export Fastify app

let app: Awaited<ReturnType<typeof buildServer>>;

beforeAll(async () => {
  app = await buildServer();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("GET /healthz returns ok", async () => {
  const res = await request(app.server).get("/healthz");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("ok", true);
});
