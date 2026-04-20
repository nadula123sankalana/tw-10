# Dandelion Colombo — Paid Media & Growth Proposal (Next.js)

Private proposal deck with optional **password protection**, **anti-indexing** hints, and a branded login screen.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Password gate (`PROPOSAL_USER` + `PROPOSAL_PASS`)

1. Copy `.env.example` to `.env.local`.
2. Set **both** `PROPOSAL_USER` and `PROPOSAL_PASS` (trimmed; empty values are ignored).
3. Restart the dev server (or redeploy on Vercel).

**When both are set:**

- Unauthenticated visitors are **redirected to `/login`** (with `?next=` preserving the intended path).
- Access is allowed if either:
  - A valid **`proposal_session` HTTP-only cookie** (set by `POST /api/login`), or
  - **HTTP Basic Auth** (`Authorization: Basic …`) with the same username and password.

**When either variable is missing:**

- The deck is **public** (no redirect).
- In **development**, a yellow **banner** explains that auth is off, and the server logs a console warning (see `instrumentation.js`).

Optional **`PROPOSAL_SESSION_SECRET`** (≥16 characters): if set, session cookies are signed with this secret instead of a key derived from user + password.

### Logout

- `GET` or `POST` **`/api/logout`** — clears the session cookie and redirects to `/login`.

### Security notes

- This is **casual access control** for a proposal, not a full security product.
- **`robots.txt` / meta / headers** reduce accidental indexing; they are **not** a guarantee against discovery.
- Do **not** commit `.env` or `.env.local`. On Vercel, set variables in **Project → Settings → Environment Variables** and redeploy.

## “No indexing” stack

| Mechanism | Where |
|-----------|--------|
| `X-Robots-Tag: noindex, nofollow` + conservative `Cache-Control` | Set on responses via `proxy.js` when auth is configured |
| `metadata.robots` | `app/layout.js` |
| `app/robots.js` | `Disallow: /` for all user agents |

## Project map (auth-related)

| Piece | Role |
|-------|------|
| `proxy.js` | Next.js 16 **proxy** (replaces deprecated `middleware`): redirect to `/login` unless session or Basic Auth; public paths for login, APIs, assets |
| `lib/proposal-auth.js` | Credentials, session token create/verify, cookie options, `safeNextPath` |
| `app/login/` | Login UI |
| `app/api/login/route.js` | Validates credentials, sets cookie (form redirect or JSON) |
| `app/api/logout/route.js` | Clears cookie |
| `app/dev-auth-banner.js` | Dev-only banner when env is missing |
| `instrumentation.js` | Dev console warning when credentials are unset |

This lines up with common tutorials that used **`middleware` + cookie**; here the entry file is **`proxy.js`** per Next.js 16.

## Troubleshooting

**“Why is there no login?”**  
`PROPOSAL_USER` and `PROPOSAL_PASS` are not both set. Add them to `.env.local` and restart.

**Build** — run `npm run build` after changes; it should complete without errors.

## Deploy (Vercel)

1. Do **not** upload `.env.local` as a file in the repo.
2. Add the same variable names in Vercel **Environment Variables**.
3. Redeploy after changing secrets.
