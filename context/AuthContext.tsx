"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean; // ← مضاف: مهم عشان نمنع redirect قبل ما Firebase يرجع الـ session
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // true حتى Firebase يأكد الـ session

  // Firebase يحافظ على الـ session تلقائياً — onAuthStateChanged هو المصدر الوحيد للحقيقة
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "User",
          email: firebaseUser.email || "",
          photoURL: firebaseUser.photoURL,
          createdAt:
            firebaseUser.metadata.creationTime || new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // cleanup عند unmount
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged هيتحدث تلقائياً
  };

  const register = async (name: string, email: string, password: string) => {
    const { user: fbUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(fbUser, { displayName: name });
    // نحدث الـ state يدوياً عشان onAuthStateChanged ممكن يكون اتفعّل قبل updateProfile
    setUser({
      uid: fbUser.uid,
      name,
      email: fbUser.email || "",
      photoURL: null,
      createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
    });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // onAuthStateChanged هيتحدث تلقائياً
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, logout }}
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