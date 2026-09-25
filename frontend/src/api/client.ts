import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type {
  ApiError,
  NormalizedApiError,
  User,
  ValidationErrors,
} from "@/types/api";

const ACCESS_TOKEN_KEY = "expense-tracker.access-token";
const AUTH_USER_KEY = "expense-tracker.user";
const AUTH_EXPIRES_AT_KEY = "expense-tracker.expires-at";
const UNAUTHORIZED_EVENT = "expense-tracker:unauthorized";

let inMemoryAccessToken: string | null = null;

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (inMemoryAccessToken) {
    return inMemoryAccessToken;
  }

  return hasWindow() ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;
}

export interface StoredAuthSession {
  accessToken: string;
  expiresAt: string;
  user: User;
}

export function persistAuthSession(
  session: StoredAuthSession,
  remember: boolean,
): void {
  inMemoryAccessToken = session.accessToken;

  if (!hasWindow()) {
    return;
  }

  if (remember) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
    window.localStorage.setItem(AUTH_EXPIRES_AT_KEY, session.expiresAt);
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
  window.localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}

export function restoreAuthSession(): StoredAuthSession | null {
  if (!hasWindow()) {
    return null;
  }

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiresAt = window.localStorage.getItem(AUTH_EXPIRES_AT_KEY);
  const serializedUser = window.localStorage.getItem(AUTH_USER_KEY);

  if (!accessToken || !expiresAt || !serializedUser) {
    return null;
  }

  if (new Date(expiresAt).getTime() <= Date.now()) {
    clearAuthSession();
    return null;
  }

  try {
    const user = JSON.parse(serializedUser) as User;
    inMemoryAccessToken = accessToken;
    return { accessToken, expiresAt, user };
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession(): void {
  inMemoryAccessToken = null;

  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
  window.localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}

function isValidationErrors(value: unknown): value is ValidationErrors {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (messages) =>
      Array.isArray(messages) &&
      messages.every((message) => typeof message === "string"),
  );
}

function isApiError(value: unknown): value is ApiError {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<ApiError>;
  return (
    typeof candidate.status === "number" &&
    typeof candidate.message === "string" &&
    (candidate.errors === undefined || isValidationErrors(candidate.errors))
  );
}

function getFallbackMessage(status: number): string {
  if (status === 0) {
    return "Unable to connect to the server. Please try again.";
  }

  if (status >= 500) {
    return "Something went wrong on the server. Please try again later.";
  }

  return "The request could not be completed.";
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      status: 0,
      message: error instanceof Error ? error.message : getFallbackMessage(0),
    };
  }

  const axiosError = error as AxiosError<unknown>;
  const status = axiosError.response?.status ?? 0;
  const responseData = axiosError.response?.data;

  if (isApiError(responseData)) {
    return {
      status,
      message: responseData.message,
      errors: responseData.errors,
    };
  }

  return {
    status,
    message: getFallbackMessage(status),
  };
}

function handleUnauthorized(): void {
  clearAuthSession();

  if (!hasWindow()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));

  if (window.location.pathname !== "/login") {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: unknown): Promise<never> => {
    const normalizedError = normalizeApiError(error);

    if (normalizedError.status === 401) {
      handleUnauthorized();
    }

    return Promise.reject(normalizedError);
  },
);

export function subscribeToUnauthorized(callback: () => void): () => void {
  if (!hasWindow()) {
    return () => undefined;
  }

  window.addEventListener(UNAUTHORIZED_EVENT, callback);
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, callback);
}
