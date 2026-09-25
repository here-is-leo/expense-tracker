import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, UserRound } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Your financial overview at a glance.",
  },
  "/transactions": {
    title: "Transactions",
    description: "Review and manage your financial activity.",
  },
};

function getInitials(displayName: string): string {
  return displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";
}

export interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const page = pageTitles[location.pathname] ?? {
    title: "Expense Tracker",
    description: "Manage your finances with confidence.",
  };

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      if (!menuContainerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleLogout = (): void => {
    setMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-fintech-navy/65 backdrop-blur-2xl">
      <div className="flex h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {page.title}
            </h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {page.description}
            </p>
          </div>
        </div>

        <div className="relative" ref={menuContainerRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 transition-colors hover:border-white/[0.08] hover:bg-white/[0.04] focus-visible:ring-offset-0 sm:pr-2.5"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="menu"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-fintech-cyan/25 to-fintech-purple/35 text-xs font-semibold text-foreground ring-1 ring-white/10">
              {getInitials(user?.displayName ?? "User")}
            </span>
            <span className="hidden max-w-36 text-left sm:block">
              <span className="block truncate text-xs font-medium text-foreground">
                {user?.displayName ?? "User"}
              </span>
              <span className="block truncate text-[0.6875rem] text-muted-foreground">
                {user?.email ?? ""}
              </span>
            </span>
            <ChevronDown
              className={`hidden size-3.5 text-muted-foreground transition-transform sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                id={menuId}
                role="menu"
                className="absolute right-0 top-[calc(100%+0.5rem)] w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#10152f]/95 p-1.5 shadow-2xl backdrop-blur-2xl"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <div className="border-b border-white/[0.07] px-3 py-2.5 sm:hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user?.displayName ?? "User"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email ?? ""}
                  </p>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  disabled
                  className="flex w-full cursor-not-allowed items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground opacity-60"
                >
                  <UserRound className="size-4" aria-hidden="true" />
                  Profile
                  <span className="ml-auto text-[0.625rem] uppercase tracking-wider">
                    Soon
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Log out
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
