import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import type { NormalizedApiError } from "@/types/api";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function isNormalizedApiError(error: unknown): error is NormalizedApiError {
  if (!error || typeof error !== "object" || Array.isArray(error)) {
    return false;
  }

  const candidate = error as Partial<NormalizedApiError>;
  return (
    typeof candidate.status === "number" && typeof candidate.message === "string"
  );
}

function getSafeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setSubmitError(null);

    try {
      await login(
        { email: values.email, password: values.password },
        { remember: values.remember },
      );
      navigate(getSafeReturnPath(searchParams.get("returnTo")), {
        replace: true,
      });
    } catch (error) {
      if (isNormalizedApiError(error)) {
        if (error.status === 400 || error.status === 401) {
          setSubmitError("Invalid email or password.");
          return;
        }

        setSubmitError(error.message);
        return;
      }

      setSubmitError("We could not sign you in. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel w-full rounded-[1.25rem] p-6 sm:p-8"
    >
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Continue to your financial dashboard and recent activity.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {submitError}
          </motion.div>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 hover:border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              {...register("email")}
            />
          </div>
          {errors.email ? (
            <p id="email-error" className="text-xs text-red-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 hover:border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:ring-offset-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="size-[1.125rem]" aria-hidden="true" />
              ) : (
                <Eye className="size-[1.125rem]" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p id="password-error" className="text-xs text-red-300">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="size-4 rounded border-white/20 bg-white/[0.06] text-primary accent-[#00d4ff] focus:ring-primary focus:ring-offset-background"
            {...register("remember")}
          />
          Remember me on this device
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fintech-cyan to-fintech-blue px-4 text-sm font-semibold text-fintech-navy shadow-glow-cyan transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Expense Tracker?{" "}
        <Link
          to="/register"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-fintech-cyan hover:underline"
        >
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}
