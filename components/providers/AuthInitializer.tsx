"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthInitializer() {
  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  return null;
}
