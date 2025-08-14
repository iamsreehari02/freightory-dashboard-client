import { Container } from "@/models/container";
import {
  deleteContainer,
  getAllContainers,
  getContainerById,
  getLatestContainers,
} from "@/services/api/containers";
import { create } from "zustand";

interface ContainerStore {
  containers: Container[];
  latestContainers: Container[];
  isLoading: boolean; // for general list fetching
  isFetchingContainerById: boolean; // loading for single fetch
  isDeleting: boolean; // loading for delete action
  fetchContainers: () => Promise<void>;
  fetchLatestContainers: () => Promise<void>;
  fetchContainerById: (id: string) => Promise<Container | null>;
  removeContainer: (id: string) => Promise<boolean>;
  addContainer: (container: Container) => void;
}

export const useContainerStore = create<ContainerStore>((set, get) => ({
  containers: [],
  latestContainers: [],
  isLoading: false,
  isFetchingContainerById: false,
  isDeleting: false,

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

  fetchContainerById: async (id: string) => {
    set({ isFetchingContainerById: true });
    try {
      const container = await getContainerById(id);
      return container;
    } catch (error) {
      console.error("Failed to fetch container by id", error);
      return null;
    } finally {
      set({ isFetchingContainerById: false });
    }
  },

 removeContainer: async (id: string) => {
    set({ isDeleting: true });
    try {
      await deleteContainer(id);  // use your imported API call

      // Remove container from state
      set({
        containers: get().containers.filter((c) => c._id !== id),
      });

      return true;
    } catch (error) {
      console.error("Failed to delete container", error);
      return false;
    } finally {
      set({ isDeleting: false });
    }
  },

  addContainer: (container) =>
    set((state) => ({
      containers: [container, ...state.containers],
    })),
}));
