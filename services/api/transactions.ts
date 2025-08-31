import { api } from "@/lib/api";
import { Transaction } from "@/store/useTransactionsStore";

export const getAllTransactions = async (
  latest: boolean = false
): Promise<Transaction[]> => {
  const url = latest ? "/transactions?latest=true" : "/transactions";
  const res = await api.get(url);
  return res.data.transactions;
};

export const getTransactionsByCompany = async (
  latest: boolean = false
): Promise<Transaction[]> => {
  const url = latest
    ? "/transactions/company?latest=true"
    : "/transactions/company";
  const res = await api.get(url);
  return res.data.transactions;
};

export const downloadInvoice = async (transactionId: string): Promise<void> => {
  const response = await api.get(`/transactions/${transactionId}/invoice`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${transactionId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};
