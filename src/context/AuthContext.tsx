import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as loginRequest } from '../api/client';

interface AuthContextValue {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem('auth_user'));

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: token !== null,
      email,
      login: async (loginEmail: string, password: string) => {
        const result = await loginRequest(loginEmail, password);

        if (!result) {
          return false;
        }

        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('auth_user', loginEmail);
        setToken(result.token);
        setEmail(loginEmail);
        return true;
      },
      logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setToken(null);
        setEmail(null);
      },
    }),
    [token, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
