import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login as loginRequest, register as registerRequest } from "@/api/auth";
import {
  clearAuthSession,
  getAccessToken,
  persistAuthSession,
  restoreAuthSession,
  subscribeToUnauthorized,
} from "@/api/client";
import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/api";

export interface LoginOptions {
  remember?: boolean;
}

export interface RegisterOptions {
  remember?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginRequest, options?: LoginOptions) => Promise<void>;
  register: (
    details: RegisterRequest,
    options?: RegisterOptions,
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: string | null;
}

const EMPTY_AUTH_STATE: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>(EMPTY_AUTH_STATE);
  const [isInitializing, setIsInitializing] = useState(true);

  const logout = useCallback((): void => {
    clearAuthSession();
    setAuthState(EMPTY_AUTH_STATE);
  }, []);

  useEffect(() => {
    const restoredSession = restoreAuthSession();

    if (restoredSession) {
      setAuthState({
        user: restoredSession.user,
        token: restoredSession.accessToken,
        expiresAt: restoredSession.expiresAt,
      });
    }

    setIsInitializing(false);
  }, []);

  useEffect(() => subscribeToUnauthorized(logout), [logout]);

  useEffect(() => {
    if (!authState.expiresAt) {
      return undefined;
    }

    const expiresIn = new Date(authState.expiresAt).getTime() - Date.now();

    if (expiresIn <= 0) {
      logout();
      return undefined;
    }

    const timerId = window.setTimeout(logout, expiresIn);
    return () => window.clearTimeout(timerId);
  }, [authState.expiresAt, logout]);

  const login = useCallback(
    async (
      credentials: LoginRequest,
      options: LoginOptions = {},
    ): Promise<void> => {
      const response = await loginRequest(credentials);
      const remember = options.remember ?? false;

      persistAuthSession(response, remember);
      setAuthState({
        user: response.user,
        token: response.accessToken,
        expiresAt: response.expiresAt,
      });
    },
    [],
  );

  const register = useCallback(
    async (
      details: RegisterRequest,
      options: RegisterOptions = {},
    ): Promise<void> => {
      const response = await registerRequest(details);
      const remember = options.remember ?? true;

      persistAuthSession(response, remember);
      setAuthState({
        user: response.user,
        token: response.accessToken,
        expiresAt: response.expiresAt,
      });
    },
    [],
  );

  const value = useMemo<AuthContextValue>(() => {
    const token = authState.token ?? getAccessToken();

    return {
      user: authState.user,
      token,
      isAuthenticated: Boolean(authState.user && token),
      isInitializing,
      login,
      register,
      logout,
    };
  }, [authState.token, authState.user, isInitializing, login, logout, register]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
