import { Member } from "@/models/member";
import {
  getAllMembers,
  getMemberById as fetchMemberByIdApi,
} from "@/services/api/members";
import { create } from "zustand";

type MemberState = {
  allMembers: Member[];
  latestMembers: Member[];
  isLoadingAll: boolean;
  isLoadingLatest: boolean;
  error: string | null;

  fetchAllMembers: () => Promise<void>;
  fetchLatestMembers: () => Promise<void>;
  getMemberById: (id: string) => Member | undefined;
  fetchMemberById: (id: string) => Promise<Member | null>;
  mutateMember: (
    action: "delete" | "suspend",
    userId: string,
    data?: { status?: string }
  ) => void;
};

const isValidStatus = (status: string): status is "active" | "suspended" =>
  status === "active" || status === "suspended";

export const useMemberStore = create<MemberState>((set, get) => ({
  allMembers: [],
  latestMembers: [],
  isLoadingAll: false,
  isLoadingLatest: false,
  error: null,

  fetchAllMembers: async () => {
    try {
      set({ isLoadingAll: true, error: null });
      const res = await getAllMembers();
      set({ allMembers: res, isLoadingAll: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch all members", isLoadingAll: false });
    }
  },

  fetchLatestMembers: async () => {
    try {
      set({ isLoadingLatest: true, error: null });
      const res = await getAllMembers(true);
      set({ latestMembers: res, isLoadingLatest: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch latest members", isLoadingLatest: false });
    }
  },

  getMemberById: (id) => {
    return get().allMembers.find((m) => m._id === id);
  },

  fetchMemberById: async (id) => {
    try {
      const member = await fetchMemberByIdApi(id);
      if (!member) return null;

      // Optional: update the store if not already there
      const exists = get().allMembers.some((m) => m._id === id);
      if (!exists) {
        set((state) => ({
          allMembers: [...state.allMembers, member],
        }));
      }

      return member;
    } catch (err) {
      console.error("Failed to fetch member by ID", err);
      return null;
    }
  },

  mutateMember: (
    action: "delete" | "suspend",
    userId: string,
    data?: { status?: string }
  ) =>
    set((state) => {
      if (action === "delete") {
        return {
          allMembers: state.allMembers.filter((m) => m._id !== userId),
        };
      }

      if (action === "suspend" && data?.status && isValidStatus(data.status)) {
        const newStatus: Member["status"] = data.status;

        return {
          allMembers: state.allMembers.map((m) =>
            m._id === userId ? { ...m, status: newStatus } : m
          ),
        };
      }

      return {};
    }),
}));
