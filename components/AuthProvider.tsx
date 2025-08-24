"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { GlobalLoading } from "./shared/GlobalLoading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth, user } = useAuthStore();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [redirected, setRedirected] = useState(false); // ensure redirect only happens once

  useEffect(() => {
    const initAuth = async () => {
      if (authChecked || redirected) return; // prevent double calls

      const isValid = await checkAuth();

      if (!isValid) {
        setRedirected(true);
        router.replace("/login");
        return;
      }

      setAuthChecked(true);
    };

    initAuth();
  }, [checkAuth, authChecked, redirected, router]);

  // Handle suspended user after auth is checked
  useEffect(() => {
    if (authChecked && user && user.isSuspended && !redirected) {
      setRedirected(true);
      router.replace("/account-suspended");
    }
  }, [authChecked, user, redirected, router]);

  // Show loading until auth is done or redirecting
  if (isLoading || !authChecked || (user && user.isSuspended && !redirected))
    return <GlobalLoading />;

  // Don't render children if not authenticated or suspended
  if (!isAuthenticated || (user && user.isSuspended)) return null;

  return <>{children}</>;
}
