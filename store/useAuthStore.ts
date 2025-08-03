import { getMe } from "@/services/api/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  email: string;
  phone: string;
  companyId: string;
  role: "admin" | "freight_forwarder" | "nvooc";
}

interface Company {
  _id: string;
  companyName: string;
  contactPerson: string;
  website?: string;
  headOfficeAddress: string;
  country: string;
  pinCode: string;
  freightType: string; // 'freight_forwarder' or 'nvooc'
  costPerBranch: number;
  baseRegistrationFee: number;
  totalRegistrationCost: number;
}

interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Computed
  companyType: "freight_forwarder" | "nvooc" | null;
  isFreightForwarder: boolean;
  isNVOCC: boolean;
  userRole: "admin" | "freight_forwarder" | "nvooc" | null;

  // Actions
  login: (userData: { user: User; company: Company }) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateCompany: (companyData: Partial<Company>) => void;
  checkAuth: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      company: null,
      isAuthenticated: false,
      isLoading: true,

      // Computed: Company Type
      get companyType() {
        const company = get().company;
        if (!company) return null;
        return company.freightType.toLowerCase().replace(/\s+/g, "_") as
          | "freight_forwarder"
          | "nvooc";
      },

      get isFreightForwarder() {
        return get().companyType === "freight_forwarder";
      },

      get isNVOCC() {
        return get().companyType === "nvooc";
      },

      // ✅ Computed: User Role
      get userRole() {
        return get().user?.role ?? null;
      },

      login: ({ user, company }) => {
        set({
          user,
          company,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          // Clear local store
          set({
            user: null,
            company: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      updateCompany: (companyData: Partial<Company>) => {
        const currentCompany = get().company;
        if (currentCompany) {
          set({
            company: { ...currentCompany, ...companyData },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const response = await getMe();
          set({
            user: response.user,
            company: response.company,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error("Auth check failed:", error);
          set({
            user: null,
            company: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        company: state.company,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
