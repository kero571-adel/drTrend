import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_KEY = "drtrend_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulated auth
    await new Promise((r) => setTimeout(r, 400));
    if (!email || !password) throw new Error("Please enter email and password");
    if (password.length < 6) throw new Error("Password must be at least 6 characters");
    const existing = user;
    const u: User = existing || {
      uid: Math.random().toString(36).slice(2, 10),
      name: email.split("@")[0],
      email,
      photoURL: null,
      createdAt: new Date().toISOString(),
    };
    setUser(u);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    if (!name || !email || !password) throw new Error("All fields are required");
    if (password.length < 6) throw new Error("Password must be at least 6 characters");
    setUser({
      uid: Math.random().toString(36).slice(2, 10),
      name,
      email,
      photoURL: null,
      createdAt: new Date().toISOString(),
    });
  };

  const loginWithGoogle = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({
      uid: "google_" + Math.random().toString(36).slice(2, 10),
      name: "Google User",
      email: "google.user@example.com",
      photoURL: null,
      createdAt: new Date().toISOString(),
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, register, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
