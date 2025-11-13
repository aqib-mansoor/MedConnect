// MedConnect/src/utils/storage.ts
import type { User } from "../types/auth";

export const getUsers = (): User[] => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const findUser = (email: string, password: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password);
};
