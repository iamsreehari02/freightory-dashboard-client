import { getAllContainerLogs } from "@/services/api/containers";
import { create } from "zustand";

// Type for a single log entry
type ContainerLog = {
  _id: string;
  containerId: {
    _id: string;
    containerId: string;
  };
  action: string;
  message: string;
  createdBy?: {
    _id: string;
    name: string;
  };
  createdAt: string;
};

// Zustand store type
interface ContainerLogState {
  logs: ContainerLog[];
  isLoading: boolean;
  fetchLogs: () => Promise<void>;
}

export const useContainerLogStore = create<ContainerLogState>((set) => ({
  logs: [],
  isLoading: false,

  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      const logs = await getAllContainerLogs();
      set({ logs });
    } catch (err) {
      console.error("Failed to fetch container logs", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
