import { api } from "@/lib/api";
import { Branch } from "@/models/branch";

export const createBranch = async (data: Partial<Branch>) => {
  const res = await api.post("/branch", data);
  return res.data;
};

export const deleteBranch = async (branchId: string) => {
  const res = await api.delete(`/branch/${branchId}`);
  return res.data;
};

export const getBranchById = async (branchId: string) => {
  const res = await api.get(`/branch/${branchId}`);
  return res.data;
};

export const getBranchesByCompany = async (companyId: string) => {
  const res = await api.get(`/branch/company/${companyId}`);
  return res.data;
};
