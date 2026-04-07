import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useState } from "react";
import type { UserRole } from "../types";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  principalId: string | null;
  login: () => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const ROLE_KEY = "constructly_user_role";

export function useAuth(): AuthState {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const [role, setRoleState] = useState<UserRole | null>(() => {
    const stored = localStorage.getItem(ROLE_KEY);
    return stored ? (stored as UserRole) : null;
  });

  const isAuthenticated = loginStatus === "success";
  const isLoading =
    loginStatus === "initializing" || loginStatus === "logging-in";

  const setRole = useCallback((r: UserRole) => {
    localStorage.setItem(ROLE_KEY, r);
    setRoleState(r);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ROLE_KEY);
    setRoleState(null);
    clear();
  }, [clear]);

  const principalId = identity?.getPrincipal().toText() ?? null;

  return {
    isAuthenticated,
    isLoading,
    role,
    principalId,
    login,
    logout,
    setRole,
  };
}
