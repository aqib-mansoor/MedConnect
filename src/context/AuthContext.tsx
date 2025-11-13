// MedConnect/src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { User } from "../types/auth";
import { findUser, getUsers, saveUser } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string) => {
    const found = findUser(email, password);
    if (found) {
      localStorage.setItem("authUser", JSON.stringify(found));
      setUser(found);
      // optionally save currentUserEmail for appointments
      localStorage.setItem("currentUserEmail", found.email);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };

  const register = (newUser: User) => {
    const users = getUsers();
    const exists = users.some(u => u.email === newUser.email);
    if (exists) return false;
    saveUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
