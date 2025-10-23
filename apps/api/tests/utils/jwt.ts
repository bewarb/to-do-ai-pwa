import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "dev-secret";

export function mintTestJWT(payload: Record<string, any> = {}) {
  const base = { sub: "test-user", email: "test@example.com", ...payload };
  return jwt.sign(base, SECRET, { algorithm: "HS256", expiresIn: "30m" });
}
