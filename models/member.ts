import type { Company } from "./company";

export type Member = {
  _id: string;
  email: string;
  phone: string;
  role: "admin" | "freight_forwarder" | "nvocc";
  status: "active" | "suspended";
  createdAt: string;
  company: Company | null;
};

export const getMemberStatusText = (status: Member["status"]) =>
  status === "suspended" ? "Suspended" : "Active";

export const getRoleLabel = (role: Member["role"]) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "freight_forwarder":
      return "Freight Forwarder";
    case "nvocc":
      return "NVOCC";
    default:
      return "Unknown";
  }
};
