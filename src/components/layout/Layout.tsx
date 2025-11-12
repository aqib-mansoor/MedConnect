import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {user && <Sidebar role={user.role} />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 mt-4">{children}</main>
      </div>
    </div>
  );
}
