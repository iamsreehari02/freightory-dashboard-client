import { Company } from "./company";

export type Container = {
  _id: string;
  containerId: string;
  containerType:
    | "20ft"
    | "40ft"
    | "Reefer"
    | "Open Top"
    | "Flat Rack"
    | "Other";
  status: "available" | "in_use" | "maintenance" | "suspended";
  company: Company;
  createdAt: string;
  updatedAt: string;
  port: string | { _id: string; name: string; country: string };
  country: string;
  unitsAvailable: number;
  availableFrom: string;
  specialRate?: number;
  agentDetails?: string;
};

export const getContainerDisplayName = (container: Container | null) =>
  container?.containerId || "—";

export const getContainerTypeLabel = (type: Container["containerType"]) => {
  switch (type) {
    case "20ft":
      return "20 ft";
    case "40ft":
      return "40 ft";
    case "Reefer":
      return "Reefer";
    case "Open Top":
      return "Open Top";
    case "Flat Rack":
      return "Flat Rack";
    case "Other":
      return "Other";
    default:
      return "Unknown";
  }
};

export const getContainerStatusLabel = (status: Container["status"]) => {
  switch (status) {
    case "available":
      return "Available";
    case "in_use":
      return "In Use";
    case "maintenance":
      return "Maintenance";
    case "suspended":
      return "Suspended";
    default:
      return "Unknown";
  }
};
