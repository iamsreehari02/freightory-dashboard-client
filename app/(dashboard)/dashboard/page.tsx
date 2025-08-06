"use client";

import { useAuthStore } from "@/store/useAuthStore";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import { GlobalLoading } from "@/components/shared/GlobalLoading";

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();

  const userRole = user?.role;

  if (isLoading) return <GlobalLoading />;

  if (userRole === "admin") return <AdminDashboard />;
  if (userRole === "freight_forwarder") return <p>Freight forwarder</p>;
  if (userRole === "nvocc") return <p>Nvocc</p>;

  return <div className="text-center text-red-500">Unauthorized access</div>;
}
