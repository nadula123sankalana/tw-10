import { NextResponse } from "next/server";
import {
  isProposalAuthConfigured,
  credentialsMatch,
  createProposalSessionToken,
  PROPOSAL_COOKIE,
  proposalSessionCookieOptions,
  safeNextPath,
} from "../../../lib/proposal-auth.js";

export async function POST(request) {
  if (!isProposalAuthConfigured()) {
    return NextResponse.json(
      { error: "Authentication is not configured" },
      { status: 503 }
    );
  }

  let body;
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    body = await request.json();
  } else {
    const form = await request.formData();
    body = {
      user: form.get("user"),
      password: form.get("password"),
      next: form.get("next"),
    };
  }

  const user = body?.user;
  const password = body?.password;
  const next = safeNextPath(body?.next);

  if (!credentialsMatch(user, password)) {
    const wantsJson =
      ct.includes("application/json") ||
      (request.headers.get("accept") ?? "").includes("application/json");
    if (wantsJson) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login?error=1", request.url), 303);
  }

  const token = createProposalSessionToken();
  const wantsJson =
    ct.includes("application/json") ||
    (request.headers.get("accept") ?? "").includes("application/json");

  if (wantsJson) {
    const res = NextResponse.json({ ok: true, next });
    res.cookies.set(PROPOSAL_COOKIE, token, proposalSessionCookieOptions());
    return res;
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(PROPOSAL_COOKIE, token, proposalSessionCookieOptions());
  return res;
}
