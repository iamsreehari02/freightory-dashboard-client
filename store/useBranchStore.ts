import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createBranch as apiCreateBranch,
  deleteBranch as apiDeleteBranch,
  getBranchById as apiGetBranchById,
  getBranchesByCompany as apiGetBranchesByCompany,
  getLatestBranchesByCompany as apiGetLatestBranchesByCompany,
  getBranchLogs,
} from "@/services/api/branch";
import { Branch, BranchLog } from "@/models/branch";



interface BranchState {
  branches: Branch[];
  latestBranches: Branch[];
  logs: BranchLog[];
  isLoadingList: boolean;
  isLoadingDetail: boolean;
  isLoadingLatest: boolean;
  isLoadingLogs: boolean;
  errorList: string | null;
  errorDetail: string | null;
  errorLatest: string | null;
  errorLogs: string | null;

  fetchBranches: () => Promise<void>;
  fetchLatestBranches: () => Promise<void>;
  fetchBranchById: (id: string) => Promise<Branch | null>;
  createBranch: (data: Partial<Branch>) => Promise<Branch | null>;
  deleteBranch: (id: string) => Promise<void>;
  fetchLogs: () => Promise<void>;
  setBranches: (branches: Branch[]) => void;
  updateBranch: (branchId: string, data: Partial<Branch>) => void;
  clear: () => void;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set, get) => ({
      branches: [],
      latestBranches: [],
      logs: [],
      isLoadingList: false,
      isLoadingDetail: false,
      isLoadingLatest: false,
      isLoadingLogs: false,
      errorList: null,
      errorDetail: null,
      errorLatest: null,
      errorLogs: null,

      fetchBranches: async () => {
        try {
          set({ isLoadingList: true, errorList: null });
          const data = await apiGetBranchesByCompany();
          set({ branches: data, isLoadingList: false });
        } catch (err: any) {
          set({
            errorList: err.message || "Failed to fetch branches",
            isLoadingList: false,
          });
        }
      },

      fetchLatestBranches: async () => {
        try {
          set({ isLoadingLatest: true, errorLatest: null });
          const data = await apiGetLatestBranchesByCompany();
          set({ latestBranches: data, isLoadingLatest: false });
        } catch (err: any) {
          set({
            errorLatest: err.message || "Failed to fetch latest branches",
            isLoadingLatest: false,
          });
        }
      },

      fetchBranchById: async (id: string) => {
        try {
          set({ isLoadingDetail: true, errorDetail: null });
          const branch = await apiGetBranchById(id);
          set({ isLoadingDetail: false });
          return branch;
        } catch (err: any) {
          set({
            errorDetail: err.message || "Failed to fetch branch",
            isLoadingDetail: false,
          });
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
          set({
            branches: get().branches.filter((b) => b._id !== id),
            latestBranches: get().latestBranches.filter((b) => b._id !== id),
          });
        } catch (err: any) {
          set({ errorList: err.message || "Failed to delete branch" });
        }
      },

      fetchLogs: async () => {
        try {
          set({ isLoadingLogs: true, errorLogs: null });
          const data: BranchLog[] = await getBranchLogs();
          set({ logs: data, isLoadingLogs: false });
        } catch (err: any) {
          set({
            errorLogs: err.message || "Failed to fetch branch logs",
            isLoadingLogs: false,
          });
        }
      },

      setBranches: (branches) => set({ branches }),

      updateBranch: (branchId, data) =>
        set({
          branches: get().branches.map((b) =>
            b._id === branchId ? { ...b, ...data } : b
          ),
          latestBranches: get().latestBranches.map((b) =>
            b._id === branchId ? { ...b, ...data } : b
          ),
        }),

      clear: () =>
        set({
          branches: [],
          latestBranches: [],
          logs: [],
          errorList: null,
          errorDetail: null,
          errorLatest: null,
          errorLogs: null,
          isLoadingList: false,
          isLoadingDetail: false,
          isLoadingLatest: false,
          isLoadingLogs: false,
        }),
    }),
    {
      name: "branch-storage",
      partialize: (state) => ({
        branches: state.branches,
        latestBranches: state.latestBranches,
        logs: state.logs,
      }),
    }
  )
);
