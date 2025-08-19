import { api } from "@/lib/api";

export const getAllMembers = async (latest = false) => {
  const response = await api.get("/users", {
    params: latest ? { latest: true } : {},
  });
  return response.data;
};

export const getMemberById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const suspendUser = async (userId: string, suspend: boolean) => {
  const response = await api.patch(`/users/suspend/${userId}`, {
    suspend,
  });
  return response.data;
};
