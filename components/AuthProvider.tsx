"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { GlobalLoading } from "./shared/GlobalLoading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const isValid = await checkAuth();

      if (!isValid) {
        router.push("/login");
      }
    };

    initAuth();
  }, [checkAuth, router]);

  // Show loading while checking auth
  if (isLoading) return <GlobalLoading />;

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
