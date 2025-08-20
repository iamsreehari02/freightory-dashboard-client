"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { hasAccess } from "@/lib/roleGuard";

export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedPage(props: P) {
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      } else if (!hasAccess(user.role, allowedRoles)) {
        toast.error("Unauthorized access");
        router.replace("/");
      }
    }, [user, router]);

    if (!user || !hasAccess(user?.role, allowedRoles)) {
      return null; // render nothing while redirecting
    }

    return <Component {...props} />;
  };
}
