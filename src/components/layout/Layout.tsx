import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import GlobalChat from "../chat/GlobalChat"; // import the chat component

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {user && <Sidebar role={user.role} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 mt-4">{children}</main>
      </div>

      {/* Global Chat */}
      {user && <GlobalChat role={user.role} />}
    </div>
  );
}
