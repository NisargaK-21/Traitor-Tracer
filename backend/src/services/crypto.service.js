import crypto from "crypto";

const SECRET_KEY =
  process.env.CRYPTO_SECRET || "traitor-tracer-secret";

function generateSignature(data) {
  return crypto
    .createHmac("sha256", SECRET_KEY)
    .update(JSON.stringify(data))
    .digest("hex");
}

function verifySignature(data, signature) {
  return generateSignature(data) === signature;
}

export default {
  generateSignature,
  verifySignature,
};