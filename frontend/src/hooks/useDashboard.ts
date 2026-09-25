import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "@/api/dashboard";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: getDashboardSummary,
    staleTime: 60_000,
  });
}
