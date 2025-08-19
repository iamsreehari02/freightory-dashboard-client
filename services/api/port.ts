import { api } from "@/lib/api";

export const getCompanyPorts = async (country?: string) => {
  const params = country ? { country } : {};
  const response = await api.get("/port", { params });
  return response.data;
};
