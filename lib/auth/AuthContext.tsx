"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. On page load, attempt to restore the session from localStorage
    const savedToken = localStorage.getItem("securelens_token");
    const savedUser = localStorage.getItem("securelens_user");

    if (savedToken) {
      setTimeout(() => setToken(savedToken), 0);
      if (savedUser) setTimeout(() => setUser(JSON.parse(savedUser)), 0);
    }
    setTimeout(() => setIsLoading(false), 0);
  }, []);

  const login = (newToken: string, userData?: User) => {
    localStorage.setItem("securelens_token", newToken);
    if (userData) {
      localStorage.setItem("securelens_user", JSON.stringify(userData));
      setUser(userData);
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("securelens_token");
    localStorage.removeItem("securelens_user");
    setToken(null);
    setUser(null);
    router.push("/login"); // send the user back to the login page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
