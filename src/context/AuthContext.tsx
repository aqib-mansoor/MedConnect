import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth";
import { saveUser, getUsers, findUser } from "../utils/storage";

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
    const foundUser = findUser(email, password);
    if (foundUser) {
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  const register = (newUser: User) => {
    const users = getUsers();
    const exists = users.find(u => u.email === newUser.email);
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
