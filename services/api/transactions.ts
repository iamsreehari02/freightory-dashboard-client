import { api } from "@/lib/api";
import { Transaction } from "@/store/useTransactionsStore";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data.transactions;
};

export const getTransactionsByCompany = async (
  companyId: string
): Promise<Transaction[]> => {
  const res = await api.get(`/transactions/company/${companyId}`);
  return res.data.transactions;
};
