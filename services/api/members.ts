import { api } from "@/lib/api";

export const getAllMembers = async (latest = false) => {
  const response = await api.get("/users", {
    params: latest ? { latest: true } : {},
  });
  return response.data;
};
