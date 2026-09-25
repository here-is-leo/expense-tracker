import { apiClient } from "@/api/client";
import type {
  CreateTransactionRequest,
  PaginatedTransactions,
  Transaction,
  TransactionFilters,
  UpdateTransactionRequest,
} from "@/types/api";

export async function getTransactions(
  filters: TransactionFilters = {},
): Promise<PaginatedTransactions> {
  const { data } = await apiClient.get<PaginatedTransactions>("/transactions", {
    params: filters,
  });
  return data;
}

export async function getTransaction(id: string): Promise<Transaction> {
  const { data } = await apiClient.get<Transaction>(`/transactions/${id}`);
  return data;
}

export async function createTransaction(
  payload: CreateTransactionRequest,
): Promise<Transaction> {
  const { data } = await apiClient.post<Transaction>("/transactions", payload);
  return data;
}

export async function updateTransaction(
  id: string,
  payload: UpdateTransactionRequest,
): Promise<Transaction> {
  const { data } = await apiClient.put<Transaction>(
    `/transactions/${id}`,
    payload,
  );
  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/transactions/${id}`);
}
