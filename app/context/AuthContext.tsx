import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import config from "../config";

const SECURE_KEY_ACCESS = "access_token";
const SECURE_KEY_REFRESH = "refresh_token";

type User = {
  id: string;
  phone: string;
  full_name: string;
  role: string;
  status: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (phone: string, fullName: string, password: string) => Promise<void>;
  signIn: (phone: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function apiCall(path: string, options: RequestInit = {}) {
  const response = await fetch(`${config.API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await SecureStore.getItemAsync(SECURE_KEY_ACCESS);
        if (!accessToken) return;

        try {
          const data = await apiCall("/api/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(data.user);
        } catch {
          const refreshToken = await SecureStore.getItemAsync(SECURE_KEY_REFRESH);
          if (!refreshToken) return;

          try {
            const refreshed = await apiCall("/api/auth/refresh", {
              method: "POST",
              body: JSON.stringify({ refreshToken }),
            });
            await SecureStore.setItemAsync(SECURE_KEY_ACCESS, refreshed.accessToken);
            await SecureStore.setItemAsync(SECURE_KEY_REFRESH, refreshed.refreshToken);

            const data = await apiCall("/api/auth/me", {
              headers: { Authorization: `Bearer ${refreshed.accessToken}` },
            });
            setUser(data.user);
          } catch {
            await SecureStore.deleteItemAsync(SECURE_KEY_ACCESS);
            await SecureStore.deleteItemAsync(SECURE_KEY_REFRESH);
          }
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function signUp(phone: string, fullName: string, password: string) {
    const data = await apiCall("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ phone, full_name: fullName, password }),
    });
    await SecureStore.setItemAsync(SECURE_KEY_ACCESS, data.accessToken);
    await SecureStore.setItemAsync(SECURE_KEY_REFRESH, data.refreshToken);
    setUser(data.user);
  }

  async function signIn(phone: string, password: string) {
    const data = await apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    });
    await SecureStore.setItemAsync(SECURE_KEY_ACCESS, data.accessToken);
    await SecureStore.setItemAsync(SECURE_KEY_REFRESH, data.refreshToken);
    setUser(data.user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync(SECURE_KEY_ACCESS);
    await SecureStore.deleteItemAsync(SECURE_KEY_REFRESH);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
