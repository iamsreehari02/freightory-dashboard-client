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

export const getBranchesByCompany = async () => {
  const res = await api.get("/branch/company");
  return res.data;
};

export const getLatestBranchesByCompany = async () => {
  const res = await api.get("/branch/company/latest");
  return res.data;
};



export const getUpcomingRenewals = async () => {
  const res = await api.get("/branch/upcoming-renewals");
  return res.data;
};


export const getBranchLogs = async () => {
  const res = await api.get("/branch/logs");
  return res.data;
};