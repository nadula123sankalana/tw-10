import { NextResponse } from "next/server";
import {
  isProposalAuthConfigured,
  verifyProposalSessionToken,
  PROPOSAL_COOKIE,
  parseBasicAuth,
  credentialsMatch,
} from "./lib/proposal-auth.js";

function noIndexHeaders(response) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set(
    "Cache-Control",
    "private, no-store, max-age=0, must-revalidate"
  );
  return response;
}

function isPublicPath(pathname) {
  if (pathname === "/login") return true;
  if (pathname === "/api/login" || pathname === "/api/logout") return true;
  if (pathname === "/robots.txt") return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname.startsWith("/_next/")) return true;
  return false;
}

/** Static file extensions from /public (and similar) — allow without cookie */
function looksLikeStaticAsset(pathname) {
  return /\.(ico|png|jpe?g|gif|webp|svg|woff2?|ttf|eot|txt|xml|json|webmanifest)$/i.test(
    pathname
  );
}

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (!isProposalAuthConfigured()) {
    return noIndexHeaders(NextResponse.next());
  }

  if (isPublicPath(pathname) || looksLikeStaticAsset(pathname)) {
    return noIndexHeaders(NextResponse.next());
  }

  const method = request.method;

  const basic = parseBasicAuth(request.headers.get("authorization"));
  if (basic && credentialsMatch(basic.user, basic.pass)) {
    return noIndexHeaders(NextResponse.next());
  }

  const token = request.cookies.get(PROPOSAL_COOKIE)?.value;
  if (token && verifyProposalSessionToken(token)) {
    return noIndexHeaders(NextResponse.next());
  }

  if (method !== "GET" && method !== "HEAD") {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "private, no-store, max-age=0, must-revalidate",
      },
    });
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image).*)",
  ],
};
