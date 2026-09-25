import { RefreshCw, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

import { SummaryCards, SummaryCardsSkeleton } from "@/components/dashboard/SummaryCards";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { useDashboard } from "@/hooks/useDashboard";
import { isNormalizedApiError } from "@/lib/api-errors";

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="glass-panel grid min-h-[22rem] place-items-center rounded-2xl p-8 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-400/10 text-red-300">
          <RefreshCw className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          We could not load your dashboard
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </section>
  );
}

export function Dashboard() {
  const { data, error, isLoading, isFetching, refetch } = useDashboard();

  if (error && !data) {
    const message = isNormalizedApiError(error)
      ? error.message
      : "Unable to load dashboard data.";
    return (
      <div className="space-y-4">
        <p className="sr-only">{message}</p>
        <DashboardError onRetry={() => void refetch()} />
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="skeleton-shimmer h-7 w-48 rounded-full" />
            <div className="skeleton-shimmer h-4 w-64 rounded-full" />
          </div>
          <div className="skeleton-shimmer h-10 w-28 rounded-xl" />
        </div>
        <SummaryCardsSkeleton />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
          <div className="glass-panel h-[25rem] rounded-2xl" />
          <div className="glass-panel h-[25rem] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Financial overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your money, in focus.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A clear view of your latest financial activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isFetching ? "Updating…" : "Up to date"}
          </span>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 text-xs font-medium text-foreground transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={isFetching ? "size-4 animate-spin" : "size-4"}
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>
      </div>

      <SummaryCards
        totalIncome={data.totalIncome}
        totalExpense={data.totalExpense}
        balance={data.balance}
        transactionCount={data.recentTransactions.length}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <MonthlyChart monthly={data.monthly} />
        <CategoryChart categories={data.byCategory} />
      </div>

      <RecentTransactions transactions={data.recentTransactions} />

      {data.recentTransactions.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <WalletCards className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Start with your first transaction
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add income or an expense to make your dashboard useful.
            </p>
          </div>
          <Link
            to="/transactions"
            className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Add transaction
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
