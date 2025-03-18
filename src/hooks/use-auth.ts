import { useCallback, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const isAuthenticated = !!session?.user;
  const isLoading = isPending;

  // Auto-refresh session when it's about to expire
  useEffect(() => {
    if (session?.session.expiresAt) {
      const expiresAt = new Date(session.session.expiresAt).getTime();
      const timeUntilExpiry = expiresAt - Date.now();

      // Refresh 5 minutes before expiry
      const refreshTime = timeUntilExpiry - 5 * 60 * 1000;

      if (refreshTime > 0) {
        const refreshTimer = setTimeout(() => {
          refetch();
        }, refreshTime);

        return () => clearTimeout(refreshTimer);
      } else if (timeUntilExpiry > 0) {
        // If less than 5 minutes left but still valid, refresh soon
        refetch();
      }
    }
  }, [session, refetch]);

  return {
    user: session?.user || null,
    isAuthenticated,
    isLoading,
    error,
    refetch,
  };
}
