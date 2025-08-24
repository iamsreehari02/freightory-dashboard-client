import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getContactLeads,
  getContactLeadById,
} from "@/services/api/contactLeads";
import { Contact } from "@/models/contactLead";

interface ContactState {
  leads: Contact[];
  isLoadingList: boolean;
  isLoadingDetail: boolean;
  errorList: string | null;
  errorDetail: string | null;

  fetchLeads: (latest?: boolean) => Promise<void>;
  fetchLeadById: (id: string) => Promise<Contact | null>;
  setLeads: (leads: Contact[]) => void;
  addLead: (lead: Contact) => void;
  updateLead: (leadId: string, data: Partial<Contact>) => void;
  removeLead: (leadId: string) => void;
  clear: () => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      leads: [],
      isLoadingList: false,
      isLoadingDetail: false,
      errorList: null,
      errorDetail: null,

      fetchLeads: async (latest = false) => {
        try {
          set({ isLoadingList: true, errorList: null });
          const data = await getContactLeads(latest);
          set({ leads: data, isLoadingList: false });
        } catch (err: any) {
          set({
            errorList: err.message || "Failed to fetch leads",
            isLoadingList: false,
          });
        }
      },

      fetchLeadById: async (id) => {
        try {
          set({ isLoadingDetail: true, errorDetail: null });
          const lead = await getContactLeadById(id);
          set({ isLoadingDetail: false });
          return lead;
        } catch (err: any) {
          set({
            errorDetail: err.message || "Failed to fetch lead",
            isLoadingDetail: false,
          });
          return null;
        }
      },

      setLeads: (leads) => set({ leads }),

      addLead: (lead) => set({ leads: [lead, ...get().leads] }),

      updateLead: (leadId, data) =>
        set({
          leads: get().leads.map((l) =>
            l._id === leadId ? { ...l, ...data } : l
          ),
        }),

      removeLead: (leadId) =>
        set({
          leads: get().leads.filter((l) => l._id !== leadId),
        }),

      clear: () =>
        set({
          leads: [],
          errorList: null,
          errorDetail: null,
          isLoadingList: false,
          isLoadingDetail: false,
        }),
    }),
    {
      name: "contact-leads-storage",
      partialize: (state) => ({
        leads: state.leads,
      }),
    }
  )
);
