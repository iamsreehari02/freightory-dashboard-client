import { api } from "@/lib/api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getNvoccDashboardStats = async () => {
  const response = await api.get("/dashboard/nvocc");
  return response.data;
};


export const getFreightForwarderDashboardStats = async () => {
  const response = await api.get("/dashboard/freight-forwarder");
  return response.data;
};