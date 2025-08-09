import { api } from "@/lib/api";
import { Container } from "@/models/container";

type CreateContainerPayload = Partial<
  Pick<Container, "country" | "port" | "unitsAvailable" | "availableFrom">
>;

export const addContainer = async (payload: CreateContainerPayload) => {
  const response = await api.post("/containers", payload);
  return response.data;
};

export const getAllContainers = async () => {
  const response = await api.get("/containers");
  return response.data;
};

export const getAllContainerLogs = async () => {
  const response = await api.get("/containers/logs");
  return response.data;
};

export const getLatestContainers = async () => {
  const response = await api.get("/containers/latest");
  return response.data;
};
