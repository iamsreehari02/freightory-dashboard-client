import { getAllContainers } from "@/services/api/containers";
import { create } from "zustand";

type Container = {
  _id: string;
  containerId: string;
  port: string;
  country: string;
  status: string;
  createdAt: string;
  // ...add other fields as needed
};

interface ContainerStore {
  containers: Container[];
  isLoading: boolean;
  fetchContainers: () => Promise<void>;
}

export const useContainerStore = create<ContainerStore>((set) => ({
  containers: [],
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
}));
