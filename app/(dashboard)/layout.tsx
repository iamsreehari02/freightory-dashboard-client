"use client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ReactNode, useState } from "react";
import AuthProvider from "@/components/AuthProvider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar collapsed={collapsed} />
        <div className="flex flex-col flex-1">
          <Header onToggleSidebar={() => setCollapsed((prev) => !prev)} />
          <main className="flex-1 overflow-y-auto p-4 bg-muted">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
