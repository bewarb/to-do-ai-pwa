import "dotenv/config";
import jwt from "jsonwebtoken";

// minimal payload for dev
const payload = {
  sub: "u_dev_1",
  email: "dev@example.com",
};

const secret = process.env.JWT_SECRET || "changeme";
const token = jwt.sign(payload, secret, { expiresIn: "7d" });

console.log(token);
