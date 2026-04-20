import { isProposalAuthConfigured } from "../lib/proposal-auth.js";

export function DevAuthBanner() {
  if (process.env.NODE_ENV !== "development") return null;
  if (isProposalAuthConfigured()) return null;

  return (
    <div className="dev-auth-banner" role="status">
      <strong>Dev:</strong> <code>PROPOSAL_USER</code> and <code>PROPOSAL_PASS</code> are
      not both set — the proposal is <strong>public</strong>. Set them in{" "}
      <code>.env.local</code> to require login (see README).
    </div>
  );
}
