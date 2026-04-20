export async function register() {
  if (process.env.NODE_ENV !== "development") return;

  try {
    const user = process.env.PROPOSAL_USER?.trim() ?? "";
    const pass = process.env.PROPOSAL_PASS?.trim() ?? "";
    if (!user || !pass) {
      console.warn(
        "[proposal-auth] PROPOSAL_USER and PROPOSAL_PASS are not both set. The deck is public until you configure them (see README)."
      );
    }
  } catch (e) {
    console.warn(
      "[proposal-auth] Dev auth banner check failed:",
      e?.message ?? e
    );
  }
}
