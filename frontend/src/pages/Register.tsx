import { motion } from "framer-motion";
import { ChartNoAxesCombined, CircleCheck, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

import { RegisterForm } from "@/components/auth/RegisterForm";

const benefits = [
  "Track income and expenses in one place",
  "Understand spending by category",
  "See monthly financial trends clearly",
];

export function Register() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-fintech-navy px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -right-24 -top-24 size-[24rem] rounded-full bg-fintech-purple/15 blur-[100px]"
          animate={{ x: [0, -24, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-36 -left-24 size-[28rem] rounded-full bg-fintech-cyan/10 blur-[110px]"
          animate={{ x: [0, 26, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <Link
          to="/"
          className="mb-8 flex w-fit items-center gap-3 rounded-xl focus-visible:ring-offset-0"
          aria-label="Expense Tracker home"
        >
          <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-glow-cyan">
            <WalletCards className="size-5 text-primary" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Expense Tracker
          </span>
        </Link>

        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[28rem_1fr] lg:gap-20">
          <section className="mx-auto w-full max-w-md lg:mx-0">
            <RegisterForm />
          </section>

          <motion.section
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="hidden lg:block"
          >
            <div className="mb-6 grid size-12 place-items-center rounded-2xl border border-fintech-purple/25 bg-fintech-purple/10 shadow-glow-purple">
              <ChartNoAxesCombined
                className="size-6 text-fintech-purple"
                aria-hidden="true"
              />
            </div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-fintech-purple">
              Built for financial clarity
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-foreground xl:text-5xl">
              A calmer way to{" "}
              <span className="text-gradient">manage your money.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Replace scattered notes and spreadsheets with a focused view of
              your everyday finances.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-3 text-sm text-foreground/90"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-emerald-400/10">
                    <CircleCheck
                      className="size-4 text-emerald-400"
                      aria-hidden="true"
                    />
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/70 lg:text-left">
          By creating an account, you agree to use the service responsibly.
        </p>
      </div>
    </main>
  );
}

export default Register;
