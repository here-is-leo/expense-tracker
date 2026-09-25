import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", to: "/transactions", icon: ReceiptText },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

function Brand() {
  return (
    <NavLink
      to="/dashboard"
      className="group flex items-center gap-3 rounded-xl focus-visible:ring-offset-0"
      aria-label="Expense Tracker dashboard"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-primary/30 bg-primary/10 shadow-glow-cyan">
        <WalletCards className="size-5 text-primary" aria-hidden="true" />
        <span className="absolute inset-x-1 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </span>
      <span>
        <span className="block text-sm font-semibold tracking-tight text-foreground">
          Expense Tracker
        </span>
        <span className="block text-xs text-muted-foreground">Financial clarity</span>
      </span>
    </NavLink>
  );
}

function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pb-7 pt-5">
        <Brand />
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Primary navigation">
        <p className="mb-3 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
          Workspace
        </p>
        {navigationItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
                isActive
                  ? "bg-white/[0.08] text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/[0.045] hover:text-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.span
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary shadow-glow-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <Icon
                  className={cn(
                    "size-[1.125rem] shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3">
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-primary/[0.09] to-fintech-purple/[0.08] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Smart overview
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Track every transaction and understand where your money goes.
          </p>
        </div>
      </div>
    </div>
  );
}

export interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/[0.07] bg-fintech-navy/75 backdrop-blur-2xl lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.aside
              className="relative h-full w-[min(18rem,85vw)] border-r border-white/10 bg-fintech-navy shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                onClick={onMobileClose}
                className="absolute right-3 top-4 grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <SidebarContent onNavigate={onMobileClose} />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
