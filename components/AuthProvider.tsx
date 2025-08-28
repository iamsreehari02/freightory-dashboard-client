"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { GlobalLoading } from "./shared/GlobalLoading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth, user, company } =
    useAuthStore();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (authChecked || redirected) return;

      // wait until Zustand store hydrates
      if (isLoading) return;

      const isValid = await checkAuth();

      if (!isValid) {
        setRedirected(true);
        router.replace("/login");
        return;
      }

      // Admin bypasses all checks
      if (user?.role === "admin") {
        setAuthChecked(true);
        return;
      }

      // Other users
      if (user?.isSuspended) {
        setRedirected(true);
        router.replace("/account-suspended");
        return;
      }

      if (company?.paymentStatus !== "completed") {
        setRedirected(true);
        router.replace("/pending-approval");
        return;
      }

      setAuthChecked(true);
    };

    initAuth();
  }, [checkAuth, authChecked, redirected, router, user, company, isLoading]);

  if (isLoading || !authChecked || redirected) return <GlobalLoading />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
