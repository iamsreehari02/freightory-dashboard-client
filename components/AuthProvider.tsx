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
      // Prevent multiple executions
      if (authChecked || redirected) return;

      // Wait until Zustand store hydrates
      if (isLoading) return;

      try {
        const isValid = await checkAuth();

        // Step 1: Check if user is authenticated
        if (!isValid) {
          setRedirected(true);
          router.replace("/login");
          return;
        }

        // Step 2: Wait for company data to be loaded before checking payment
        // If company is null/undefined, wait for it to load
        if (!company) {
          console.log("Company data not loaded yet, waiting...");
          return;
        }

        // Step 3: Check payment status (only after company data is loaded)
        if (company.paymentStatus !== "completed") {
          console.log("Payment status:", company.paymentStatus);
          setRedirected(true);
          router.replace("/pending-approval");
          return;
        }

        // Step 4: Then check if user is suspended
        if (user?.isSuspended) {
          setRedirected(true);
          router.replace("/account-suspended");
          return;
        }

        // All checks passed
        setAuthChecked(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setRedirected(true);
        router.replace("/login");
      }
    };

    initAuth();
  }, [checkAuth, authChecked, redirected, router, user, company, isLoading]);

  // Show loading while checking auth or during redirect
  if (isLoading || !authChecked || redirected) {
    return <GlobalLoading />;
  }

  // Final safety check - if somehow not authenticated, don't render children
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
