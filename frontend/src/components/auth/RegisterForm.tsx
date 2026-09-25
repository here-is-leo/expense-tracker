import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import {
  useForm,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import type { NormalizedApiError } from "@/types/api";

const registerSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be at least 2 characters.")
      .max(100, "Display name must not exceed 100 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/\d/, "Password must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;
type RegisterField = "displayName" | "email" | "password";

function isNormalizedApiError(error: unknown): error is NormalizedApiError {
  if (!error || typeof error !== "object" || Array.isArray(error)) {
    return false;
  }

  const candidate = error as Partial<NormalizedApiError>;
  return (
    typeof candidate.status === "number" && typeof candidate.message === "string"
  );
}

function toRegisterField(field: string): RegisterField | null {
  const normalizedField = field.toLowerCase();

  if (normalizedField === "displayname" || normalizedField === "display_name") {
    return "displayName";
  }

  if (normalizedField === "email") {
    return "email";
  }

  if (normalizedField === "password") {
    return "password";
  }

  return null;
}

interface PasswordInputProps {
  id: "password" | "confirmPassword";
  label: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

function PasswordInput({
  id,
  label,
  placeholder,
  error,
  registration,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const errorId = id + "-error";
  const visibilityLabel =
    (visible ? "Hide " : "Show ") + label.toLowerCase();

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <LockKeyhole
          className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 hover:border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          {...registration}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:ring-offset-0"
          aria-label={visibilityLabel}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff className="size-[1.125rem]" aria-hidden="true" />
          ) : (
            <Eye className="size-[1.125rem]" aria-hidden="true" />
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RegisterForm() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues): Promise<void> => {
    setSubmitError(null);

    try {
      await createAccount(
        {
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        },
        { remember: true },
      );
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (!isNormalizedApiError(error)) {
        setSubmitError("We could not create your account. Please try again.");
        return;
      }

      let mappedFieldError = false;
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          const formField = toRegisterField(field);
          const message = messages[0];

          if (formField && message) {
            setError(formField, { type: "server", message });
            mappedFieldError = true;
          }
        });
      }

      if (error.status === 409) {
        setError("email", {
          type: "server",
          message: "An account with this email already exists.",
        });
        return;
      }

      if (!mappedFieldError) {
        setSubmitError(error.message);
      }
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
          Get started
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Set up your financial workspace in less than a minute.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <label
            htmlFor="displayName"
            className="text-sm font-medium text-foreground"
          >
            Display name
          </label>
          <div className="relative">
            <UserRound
              className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="displayName"
              type="text"
              autoComplete="name"
              autoFocus
              placeholder="Your name"
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={
                errors.displayName ? "displayName-error" : undefined
              }
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 hover:border-white/15 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              {...register("displayName")}
            />
          </div>
          {errors.displayName ? (
            <p id="displayName-error" className="text-xs text-red-300">
              {errors.displayName.message}
            </p>
          ) : null}
        </div>

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

        <PasswordInput
          id="password"
          label="Password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          registration={register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          placeholder="Enter your password again"
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword")}
        />

        <p className="text-xs leading-5 text-muted-foreground">
          Use at least 8 characters with one letter and one number.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fintech-cyan to-fintech-blue px-4 text-sm font-semibold text-fintech-navy shadow-glow-cyan transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-fintech-cyan hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
