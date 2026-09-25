import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "@/lib/formatters";
import type { MonthlySummary } from "@/types/api";

const monthFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
});

interface MonthlyDatum extends MonthlySummary {
  label: string;
}

function MonthlyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#10152f]/95 px-3 py-2 shadow-xl backdrop-blur-xl">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1.5 space-y-1">
        {payload.map((entry) => (
          <p
            key={entry.dataKey}
            className="flex items-center gap-2 text-xs text-foreground"
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.dataKey === "income" ? "Income" : "Expenses"}:{" "}
            <span className="font-semibold">
              {formatCurrency(Number(entry.value ?? 0))}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export interface MonthlyChartProps {
  monthly: MonthlySummary[];
}

export function MonthlyChart({ monthly }: MonthlyChartProps) {
  const data: MonthlyDatum[] = [...monthly]
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .slice(-12)
    .map((item) => ({
      ...item,
      label: monthFormatter.format(new Date(item.year, item.month - 1, 1)),
    }));

  return (
    <section className="glass-panel h-full rounded-2xl p-5 sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Monthly cash flow
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Income versus expenses over the last 12 months
        </p>
      </div>

      {data.length === 0 ? (
        <div className="grid h-72 place-items-center text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.05] text-muted-foreground">
              <BarChart3 className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-medium text-foreground">
              No monthly data yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add transactions to build your trend.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(203,213,225,0.65)", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(203,213,225,0.65)", fontSize: 11 }}
                tickFormatter={(value: number) =>
                  new Intl.NumberFormat(undefined, {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                content={<MonthlyTooltip />}
              />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  color: "rgba(203,213,225,0.7)",
                  fontSize: "12px",
                  paddingTop: "12px",
                }}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#00d4ff"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey="expense"
                name="Expenses"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
