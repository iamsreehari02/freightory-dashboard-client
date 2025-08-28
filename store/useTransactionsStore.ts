import { Company } from "@/models/company";
import {
  getAllTransactions,
  getTransactionsByCompany,
} from "@/services/api/transactions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Transaction {
  _id: string;
  transactionNumber: number | null;
  transactionId: string;
  company: Company;
  country: string;
  amount: number;
  paymentMode: "online" | "offline";
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;

  // Actions
  fetchAllTransactions: () => Promise<void>;
  fetchTransactionsByCompany: (companyId: string) => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      isLoading: false,

      fetchAllTransactions: async () => {
        set({ isLoading: true });
        try {
          const txns = await getAllTransactions();
          set({ transactions: txns, isLoading: false });
        } catch (err) {
          console.error("Failed to fetch transactions:", err);
          set({ isLoading: false });
        }
      },

      fetchTransactionsByCompany: async (companyId: string) => {
        set({ isLoading: true });
        try {
          const txns = await getTransactionsByCompany(companyId);
          set({ transactions: txns, isLoading: false });
        } catch (err) {
          console.error("Failed to fetch transactions by company:", err);
          set({ isLoading: false });
        }
      },

      setTransactions: (transactions: Transaction[]) => {
        set({ transactions });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "transactions-storage",
      partialize: (state) => ({
        transactions: state.transactions,
        isLoading: state.isLoading,
      }),
    }
  )
);
