import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

function AuthLoadingScreen() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-6"
      aria-busy="true"
      aria-label="Restoring your session"
    >
      <div className="w-full max-w-sm space-y-5" role="status">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-primary/20 shadow-glow-cyan" />
        <div className="space-y-3">
          <div className="skeleton-shimmer mx-auto h-5 w-40 rounded-full" />
          <div className="skeleton-shimmer mx-auto h-3 w-56 rounded-full" />
        </div>
        <span className="sr-only">Restoring your session…</span>
      </div>
    </main>
  );
}

export function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Navigate
        to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
        replace
      />
    );
  }

  return <Outlet />;
}
