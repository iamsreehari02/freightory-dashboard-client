"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";
import { GlobalLoading } from "@/components/shared/GlobalLoading";

export default function Home() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setChecked(true);
    };
    verify();
  }, []);

  if (!checked || isLoading) return <GlobalLoading />;

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
