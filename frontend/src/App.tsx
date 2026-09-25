import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Construction, ReceiptText } from "lucide-react";
import { lazy, Suspense, type ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "sonner";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/pages/Dashboard";
import type { NormalizedApiError } from "@/types/api";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

function isNormalizedApiError(error: unknown): error is NormalizedApiError {
  if (!error || typeof error !== "object" || Array.isArray(error)) {
    return false;
  }

  const candidate = error as Partial<NormalizedApiError>;
  return (
    typeof candidate.status === "number" && typeof candidate.message === "string"
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          isNormalizedApiError(error) &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }

        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

function FullPageLoader() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-fintech-navy px-6"
      aria-busy="true"
    >
      <div className="space-y-4 text-center" role="status">
        <div className="mx-auto size-11 animate-pulse rounded-2xl bg-primary/20 shadow-glow-cyan" />
        <p className="text-sm text-muted-foreground">Restoring your workspace…</p>
      </div>
    </main>
  );
}

function PublicOnlyRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

interface RoutePlaceholderProps {
  title: string;
  description: string;
  icon: ReactNode;
}

function RoutePlaceholder({
  title,
  description,
  icon,
}: RoutePlaceholderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel grid min-h-[28rem] place-items-center rounded-2xl p-8 text-center"
    >
      <div className="max-w-md">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-glow-cyan">
          {icon}
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground">
          <Construction className="size-3.5" aria-hidden="true" />
          Component implementation is next
        </div>
      </div>
    </motion.section>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-fintech-navy px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The page you requested does not exist or may have moved.
        </p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

function AppRoutes() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <FullPageLoader />;
  }

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/transactions"
            element={
              <RoutePlaceholder
                title="Transactions route is ready"
                description="Filtering, pagination, and transaction management will be added after the dashboard."
                icon={<ReceiptText className="size-6" aria-hidden="true" />}
              />
            }
          />
        </Route>
      </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            theme="dark"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  "border-white/10 bg-[#10152f]/95 text-foreground backdrop-blur-xl",
                description: "text-muted-foreground",
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
