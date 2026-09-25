import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

import { LoginForm } from "@/components/auth/LoginForm";

export function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-fintech-navy px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-24 -top-24 size-[22rem] rounded-full bg-fintech-cyan/10 blur-[90px]"
          animate={{ x: [0, 28, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-24 size-[28rem] rounded-full bg-fintech-purple/15 blur-[110px]"
          animate={{ x: [0, -24, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <Link
          to="/"
          className="mb-10 flex w-fit items-center gap-3 rounded-xl focus-visible:ring-offset-0"
          aria-label="Expense Tracker home"
        >
          <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-glow-cyan">
            <WalletCards className="size-5 text-primary" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Expense Tracker
          </span>
        </Link>

        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1fr_28rem] lg:gap-20">
          <motion.section
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="hidden lg:block"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Modern personal finance
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-foreground xl:text-5xl">
              See where your money goes.{" "}
              <span className="text-gradient">Decide what comes next.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              A focused financial workspace that turns everyday transactions into
              a clear, useful picture of your spending.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 backdrop-blur-lg">
                <BarChart3 className="mb-3 size-5 text-primary" aria-hidden="true" />
                <p className="text-sm font-medium text-foreground">Clear insights</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Understand income and spending without the noise.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 backdrop-blur-lg">
                <ShieldCheck
                  className="mb-3 size-5 text-fintech-purple"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-foreground">Secure access</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  JWT-protected data and automatic session expiry.
                </p>
              </div>
            </div>
          </motion.section>

          <section className="mx-auto w-full max-w-md lg:mx-0">
            <LoginForm />
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground/70 lg:text-left">
          Your credentials are never stored by this application.
        </p>
      </div>
    </main>
  );
}

export default Login;
