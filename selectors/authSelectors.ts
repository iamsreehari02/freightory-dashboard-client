import { useAuthStore } from "@/store/useAuthStore";

export const useUserRole = () => {
  const user = useAuthStore((state) => state.user);
  return user?.role ?? null;
};

export const useCompanyType = () => {
  const company = useAuthStore((state) => state.company);
  return company?.freightType?.toLowerCase().replace(/\s+/g, "_") ?? null;
};
