import { getAllMembers } from "@/services/api/members";
import { create } from "zustand";

export type Member = {
  _id: string;
  company: {
    name: string;
    country: string;
    freightType: "freight_forwarder" | "nvocc";
  } | null;
  email: string;
  status: string;
  phone: string;
  role: "admin" | "freight_forwarder" | "nvocc";
  createdAt: string;
  updatedAt: string;
};

type MemberState = {
  allMembers: Member[];
  latestMembers: Member[];
  isLoadingAll: boolean;
  isLoadingLatest: boolean;
  error: string | null;

  fetchAllMembers: () => Promise<void>;
  fetchLatestMembers: () => Promise<void>;
};

export const useMemberStore = create<MemberState>((set) => ({
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
      const res = await getAllMembers(true); // true to get latest members
      set({ latestMembers: res, isLoadingLatest: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch latest members", isLoadingLatest: false });
    }
  },
}));
