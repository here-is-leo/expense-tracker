import { apiClient } from "@/api/client";
import type { Category } from "@/types/api";

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
}
