export type TransactionType = "income" | "expense";

export type SortDirection = "asc" | "desc";

export type TransactionSortField = "date" | "amount";

export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  displayName: string;
  password: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  categoryName: string;
  description: string | null;
  transactionDate: string;
  createdAt: string;
}

export interface TransactionPayload {
  type: TransactionType;
  amount: number;
  categoryId: string;
  description?: string | null;
  transactionDate: string;
}

export type CreateTransactionRequest = TransactionPayload;

export type UpdateTransactionRequest = TransactionPayload;

export interface TransactionFilters {
  page?: number;
  pageSize?: number;
  type?: TransactionType;
  categoryId?: string;
  from?: string;
  to?: string;
  search?: string;
  sortBy?: TransactionSortField;
  sortDir?: SortDirection;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type PaginatedTransactions = PaginatedResponse<Transaction>;

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  total: number;
  count: number;
}

export interface MonthlySummary {
  year: number;
  month: number;
  income: number;
  expense: number;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: CategorySummary[];
  monthly: MonthlySummary[];
  recentTransactions: Transaction[];
}

export type ValidationErrors = Record<string, string[]>;

export interface ApiError {
  status: number;
  message: string;
  errors?: ValidationErrors;
  traceId?: string;
}

export interface NormalizedApiError {
  status: number;
  message: string;
  errors?: ValidationErrors;
}
