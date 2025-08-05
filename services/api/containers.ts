import { api } from "@/lib/api";

export const getAllContainers = async () => {
  const response = await api.get("/containers");
  return response.data;
};
