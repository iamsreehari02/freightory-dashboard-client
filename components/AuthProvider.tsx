"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

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
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
