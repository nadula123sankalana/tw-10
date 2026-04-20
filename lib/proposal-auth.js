import { createHmac, randomBytes, timingSafeEqual, createHash } from "node:crypto";

export const PROPOSAL_COOKIE = "proposal_session";

/**
 * Trimmed credentials from env. Returns nulls if unset.
 */
export function getProposalCredentials() {
  const user = process.env.PROPOSAL_USER?.trim() ?? "";
  const pass = process.env.PROPOSAL_PASS?.trim() ?? "";
  return { user, pass };
}

export function isProposalAuthConfigured() {
  const { user, pass } = getProposalCredentials();
  return Boolean(user && pass);
}

function getSessionSecret() {
  const { user, pass } = getProposalCredentials();
  const explicit = process.env.PROPOSAL_SESSION_SECRET?.trim() ?? "";
  if (explicit.length >= 16) return explicit;
  return createHash("sha256").update(`${user}:${pass}`, "utf8").digest("hex");
}

/** @param {string} user @param {string} pass */
export function credentialsMatch(user, pass) {
  const c = getProposalCredentials();
  if (!c.user || !c.pass) return false;
  const u = String(user ?? "").trim();
  const p = String(pass ?? "");
  return timingSafeString(c.user, u) && timingSafeString(c.pass, p);
}

function timingSafeString(a, b) {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  try {
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

/**
 * Signed opaque session token (7 days).
 */
export function createProposalSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const nonce = randomBytes(8).toString("hex");
  const payload = Buffer.from(JSON.stringify({ exp, nonce, v: 1 }), "utf8").toString("base64url");
  const secret = getSessionSecret();
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

/**
 * @param {string | undefined} token
 */
export function verifyProposalSessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const secret = getSessionSecret();
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const sigBuf = Buffer.from(sig, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expBuf)) return false;
  try {
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (typeof json.exp !== "number" || json.exp < now) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse Basic Authorization header. Returns { user, pass } or null.
 * @param {string | null} authorization
 */
export function parseBasicAuth(authorization) {
  if (!authorization || !authorization.startsWith("Basic ")) return null;
  let decoded;
  try {
    decoded = Buffer.from(authorization.slice(6).trim(), "base64").toString("utf8");
  } catch {
    return null;
  }
  const i = decoded.indexOf(":");
  if (i < 0) return null;
  return { user: decoded.slice(0, i), pass: decoded.slice(i + 1) };
}

/**
 * Same-origin relative path only (open-redirect safe).
 * @param {string | null | undefined} next
 */
export function safeNextPath(next) {
  if (!next || typeof next !== "string") return "/";
  const t = next.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/";
  try {
    const u = new URL(t, "http://local.invalid");
    return u.pathname + u.search + u.hash;
  } catch {
    return "/";
  }
}

export function proposalSessionCookieOptions() {
  const prod = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: prod,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
