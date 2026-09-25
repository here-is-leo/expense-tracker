import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";

import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface AnimatedValueProps {
  value: number;
  format: (value: number) => string;
}

function AnimatedValue({ value, format }: AnimatedValueProps) {
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (current) => format(current));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    });

    return controls.stop;
  }, [motionValue, value]);

  return <motion.span>{displayValue}</motion.span>;
}

interface SummaryCard {
  label: string;
  value: number;
  format: (value: number) => string;
  icon: LucideIcon;
  iconClassName: string;
  glowClassName: string;
}

export interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
  transactionCount,
}: SummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      label: "Total income",
      value: totalIncome,
      format: (amount) => formatCurrency(amount),
      icon: ArrowUpRight,
      iconClassName: "bg-emerald-400/10 text-emerald-400",
      glowClassName: "from-emerald-400/10",
    },
    {
      label: "Total expenses",
      value: totalExpense,
      format: (amount) => formatCurrency(amount),
      icon: ArrowDownRight,
      iconClassName: "bg-red-400/10 text-red-400",
      glowClassName: "from-red-400/10",
    },
    {
      label: "Current balance",
      value: balance,
      format: (amount) => formatCurrency(amount),
      icon: Landmark,
      iconClassName: "bg-primary/10 text-primary",
      glowClassName: "from-primary/10",
    },
    {
      label: "Transactions",
      value: transactionCount,
      format: (count) =>
        new Intl.NumberFormat(undefined, {
          maximumFractionDigits: 0,
        }).format(Math.round(count)),
      icon: ReceiptText,
      iconClassName: "bg-fintech-purple/10 text-fintech-purple",
      glowClassName: "from-fintech-purple/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="glass-panel relative overflow-hidden rounded-2xl p-5"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-80",
                card.glowClassName,
              )}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-xl",
                    card.iconClassName,
                  )}
                >
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
              </div>
              <p className="truncate text-2xl font-semibold tracking-tight text-foreground">
                <AnimatedValue value={card.value} format={card.format} />
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export function SummaryCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="glass-panel rounded-2xl p-5">
          <div className="mb-6 flex items-center justify-between">
            <div className="skeleton-shimmer h-4 w-24 rounded-full" />
            <div className="skeleton-shimmer size-9 rounded-xl" />
          </div>
          <div className="skeleton-shimmer h-7 w-36 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
