import { ArrowDownRight, ArrowUpRight, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";

import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/api";

export interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Recent transactions
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Your latest recorded activity
          </p>
        </div>
        <Link
          to="/transactions"
          className="shrink-0 text-xs font-medium text-primary underline-offset-4 transition hover:text-fintech-cyan hover:underline"
        >
          View all
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="grid min-h-48 place-items-center text-center">
          <div>
            <span className="mx-auto grid size-11 place-items-center rounded-xl bg-white/[0.05] text-muted-foreground">
              <ReceiptText className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-medium text-foreground">
              No transactions yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your newest activity will appear here.
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-white/[0.06]">
          {transactions.slice(0, 5).map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <li
                key={transaction.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-xl",
                    isIncome
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-red-400/10 text-red-400",
                  )}
                >
                  {isIncome ? (
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="size-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {transaction.description || transaction.categoryName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {transaction.categoryName} ·{" "}
                    {formatDate(transaction.transactionDate)}
                  </p>
                </div>
                <p
                  className={cn(
                    "shrink-0 text-sm font-semibold",
                    isIncome ? "text-emerald-400" : "text-red-300",
                  )}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="skeleton-shimmer size-9 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="skeleton-shimmer h-3.5 w-2/3 rounded-full" />
            <div className="skeleton-shimmer h-3 w-1/2 rounded-full" />
          </div>
          <div className="skeleton-shimmer h-4 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
