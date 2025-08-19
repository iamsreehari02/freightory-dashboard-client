import { api } from "@/lib/api";
import { Container } from "@/models/container";

type CreateContainerPayload = Partial<
  Pick<
    Container,
    | "country"
    | "port"
    | "unitsAvailable"
    | "availableFrom"
    | "specialRate"
    | "agentDetails"
  >
>;

export const addContainer = async (payload: CreateContainerPayload) => {
  const response = await api.post("/containers", payload);
  return response.data;
};

export const getAllContainers = async () => {
  const response = await api.get("/containers/company");
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

export const getContainerById = async (id: string): Promise<Container> => {
  const { data } = await api.get(`/containers/${id}`);
  return data;
};

export async function deleteContainer(id: string) {
  return api.patch(`/containers/${id}/delete`);
}
