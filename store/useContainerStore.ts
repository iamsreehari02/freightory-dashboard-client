import { Container } from "@/models/container";
import {
  getAllContainers,
  getLatestContainers,
} from "@/services/api/containers";
import { create } from "zustand";

interface ContainerStore {
  containers: Container[];
  latestContainers: Container[];
  isLoading: boolean;
  fetchContainers: () => Promise<void>;
  fetchLatestContainers: () => Promise<void>;
}

export const useContainerStore = create<ContainerStore>((set) => ({
  containers: [],
  latestContainers: [],
  isLoading: false,

  fetchContainers: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllContainers();
      set({ containers: data });
    } catch (error) {
      console.error("Failed to fetch containers", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLatestContainers: async () => {
    set({ isLoading: true });
    try {
      const data = await getLatestContainers();
      set({ latestContainers: data });
    } catch (error) {
      console.error("Failed to fetch latest containers", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
