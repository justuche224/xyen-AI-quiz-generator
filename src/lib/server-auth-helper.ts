import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Checks if the user's session is valid and redirects to login if not
 *
 * @param {Object} options - Configuration options
 * @param {string} options.redirectTo - Path to redirect to if authentication fails (default: "/sign-in")
 * @param {boolean} options.removeExpiredSession - Whether to remove expired sessions (default: true)
 * @returns {Promise<Object>} - The session and user object if authenticated
 */
export async function checkAuthSession({
  redirectTo = "/sign-in",
  removeExpiredSession = true,
} = {}) {
  // Get the current session
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if session exists
  if (!sessionData?.session) {
    // No session found, redirect to sign-in
    redirect(redirectTo);
  }

  // Check if session is expired
  const now = new Date();
  const expiresAt = new Date(sessionData.session.expiresAt);

  if (now > expiresAt) {
    // Session is expired
    if (removeExpiredSession) {
      // Optional: Remove the expired session
      await auth.api.revokeSession({
        body: {
          token: sessionData.session.token,
        },
        headers: await headers(),
      });
    }
    // Redirect to sign-in
    redirect(redirectTo);
  }

  // Session is valid, return the session data
  return {
    session: sessionData.session,
    user: sessionData.user,
    isAuthenticated: true,
  };
}
