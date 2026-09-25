import { PieChart as PieChartIcon } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatCurrency } from "@/lib/formatters";
import type { CategorySummary } from "@/types/api";

const CHART_COLORS = [
  "#00d4ff",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#22c55e",
  "#f97316",
  "#14b8a6",
];

interface ChartDatum {
  name: string;
  value: number;
}

interface CategoryTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number }>;
}

function CategoryTooltip({ active, payload }: CategoryTooltipProps) {
  if (!active || !payload?.[0]) {
    return null;
  }

  const entry = payload[0];
  return (
    <div className="rounded-xl border border-white/10 bg-[#10152f]/95 px-3 py-2 shadow-xl backdrop-blur-xl">
      <p className="text-xs text-muted-foreground">{entry.name ?? "Category"}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        {formatCurrency(Number(entry.value ?? 0))}
      </p>
    </div>
  );
}

export interface CategoryChartProps {
  categories: CategorySummary[];
}

export function CategoryChart({ categories }: CategoryChartProps) {
  const data: ChartDatum[] = categories
    .filter((category) => category.type === "expense" && category.total > 0)
    .sort((a, b) => b.total - a.total)
    .map((category) => ({
      name: category.categoryName,
      value: category.total,
    }));
  const total = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <section className="glass-panel h-full rounded-2xl p-5 sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Expenses by category
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Distribution of your recorded spending
        </p>
      </div>

      {data.length === 0 ? (
        <div className="grid h-72 place-items-center text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.05] text-muted-foreground">
              <PieChartIcon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-medium text-foreground">
              No expense data yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add an expense to see its category here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_9rem]">
          <div className="relative h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="transparent"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CategoryTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[0.6875rem] text-muted-foreground">Total</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>
          </div>

          <ul className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {data.map((category, index) => (
              <li key={category.name} className="flex items-center gap-2 text-xs">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {category.name}
                </span>
                <span className="font-medium text-foreground">
                  {Math.round((category.value / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
