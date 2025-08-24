import { api } from "@/lib/api";

export interface BankDetails {
  _id?: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode?: string;
  branchName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const addBankDetails = async (data: Omit<BankDetails, "_id">) => {
  const res = await api.post("/bank", data);
  return res.data;
};

export const updateBankDetails = async (data: Partial<BankDetails>) => {
  const res = await api.patch("/bank", data);
  return res.data;
};

export const getBankDetails = async () => {
  const res = await api.get("/bank");
  return res.data;
};
