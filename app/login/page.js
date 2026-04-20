import Image from "next/image";
import { redirect } from "next/navigation";
import {
  isProposalAuthConfigured,
  safeNextPath,
} from "../../lib/proposal-auth.js";

export default async function LoginPage({ searchParams }) {
  const sp = await searchParams;
  const next = safeNextPath(typeof sp?.next === "string" ? sp.next : "/");
  const err = sp?.error === "1";

  if (!isProposalAuthConfigured()) {
    redirect("/");
  }

  return (
    <main className="login-page">
      <div className="login-page__ambient" aria-hidden="true">
        <span className="login-page__blob login-page__blob--1" />
        <span className="login-page__blob login-page__blob--2" />
        <span className="login-page__blob login-page__blob--3" />
      </div>
      <div className="login-card">
        <div className="login-brand">
          <Image
            src="/l.png"
            alt="Twist Digital"
            width={200}
            height={56}
            className="login-brand__logo"
            priority
          />
        </div>
        <h1 className="login-title">Proposal access</h1>
        <p className="login-hint">Enter the credentials shared with you.</p>
        {err && (
          <p className="login-error" role="alert">
            Invalid username or password.
          </p>
        )}
        <form action="/api/login" method="POST" className="login-form">
          <input type="hidden" name="next" value={next} />
          <label className="login-label">
            <span>Username</span>
            <input
              name="user"
              type="text"
              autoComplete="username"
              required
              className="login-input"
            />
          </label>
          <label className="login-label">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="login-input"
            />
          </label>
          <button type="submit" className="login-submit">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
