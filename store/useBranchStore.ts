import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createBranch as apiCreateBranch,
  deleteBranch as apiDeleteBranch,
  getBranchById as apiGetBranchById,
  getBranchesByCompany as apiGetBranchesByCompany,
} from "@/services/api/branch";
import { Branch } from "@/models/branch";

interface BranchState {
  branches: Branch[];
  isLoadingList: boolean;
  isLoadingDetail: boolean;
  errorList: string | null;
  errorDetail: string | null;

  fetchBranches: (companyId: string) => Promise<void>;
  fetchBranchById: (id: string) => Promise<Branch | null>;
  createBranch: (data: Partial<Branch>) => Promise<Branch | null>;
  deleteBranch: (id: string) => Promise<void>;
  setBranches: (branches: Branch[]) => void;
  updateBranch: (branchId: string, data: Partial<Branch>) => void;
  clear: () => void;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set, get) => ({
      branches: [],
      isLoadingList: false,
      isLoadingDetail: false,
      errorList: null,
      errorDetail: null,

      fetchBranches: async (companyId: string) => {
        try {
          set({ isLoadingList: true, errorList: null });
          const data = await apiGetBranchesByCompany(companyId);
          set({ branches: data, isLoadingList: false });
        } catch (err: any) {
          set({ errorList: err.message || "Failed to fetch branches", isLoadingList: false });
        }
      },

      fetchBranchById: async (id: string) => {
        try {
          set({ isLoadingDetail: true, errorDetail: null });
          const branch = await apiGetBranchById(id);
          set({ isLoadingDetail: false });
          return branch;
        } catch (err: any) {
          set({ errorDetail: err.message || "Failed to fetch branch", isLoadingDetail: false });
          return null;
        }
      },

      createBranch: async (data: Partial<Branch>) => {
        try {
          const branch = await apiCreateBranch(data);
          set({ branches: [branch, ...get().branches] });
          return branch;
        } catch (err: any) {
          set({ errorList: err.message || "Failed to create branch" });
          return null;
        }
      },

      deleteBranch: async (id: string) => {
        try {
          await apiDeleteBranch(id);
          set({ branches: get().branches.filter((b) => b._id !== id) });
        } catch (err: any) {
          set({ errorList: err.message || "Failed to delete branch" });
        }
      },

      setBranches: (branches) => set({ branches }),

      updateBranch: (branchId, data) =>
        set({
          branches: get().branches.map((b) =>
            b._id === branchId ? { ...b, ...data } : b
          ),
        }),

      clear: () =>
        set({
          branches: [],
          errorList: null,
          errorDetail: null,
          isLoadingList: false,
          isLoadingDetail: false,
        }),
    }),
    {
      name: "branch-storage",
      partialize: (state) => ({
        branches: state.branches,
      }),
    }
  )
);
