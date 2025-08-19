export type Branch = {
  _id: string;
  companyId: string;
  name: string;
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export interface BranchLog {
  _id: string;
  branchId: string;
  action: "created" | "updated" | "deleted"; // or any other actions you define
  message: string;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const getBranchDisplayName = (branch: Branch | null) =>
  branch?.name || "—";

export const getBranchContactPerson = (branch: Branch | null) =>
  branch?.contactPerson || "—";

export const getBranchEmail = (branch: Branch | null) =>
  branch?.email || "—";

export const getBranchPhone = (branch: Branch | null) =>
  branch?.phone || "—";

export const getBranchLocation = (branch: Branch | null) =>
  branch ? `${branch.city}, ${branch.country}` : "—";
