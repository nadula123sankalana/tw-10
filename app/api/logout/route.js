import { NextResponse } from "next/server";
import { PROPOSAL_COOKIE } from "../../../lib/proposal-auth.js";

export async function GET(request) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.set(PROPOSAL_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function POST(request) {
  return GET(request);
}
