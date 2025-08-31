import { Company } from "@/models/company";
import { PaymentProof } from "@/models/paymentProof";
import {
  getAllTransactions,
  getTransactionsByCompany,
  downloadInvoice,
} from "@/services/api/transactions";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

export interface Transaction {
  _id: string;
  transactionNumber: number | null;
  transactionId: string;
  company: Company;
  country: string;
  amount: number;
  paymentMode: "online" | "offline";
  status: "pending" | "completed" | "failed" | "rejected";
  createdAt: string;
  paymentProof?: PaymentProof;
}

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  isDownloading: boolean;

  fetchAllTransactions: (latest?: boolean) => Promise<void>;
  fetchTransactionsByCompany: (latest?: boolean) => Promise<void>;
  downloadInvoiceById: (transactionId: string) => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;

  approvePaymentProof: (proofId: string, remarks?: string) => Promise<void>;
  rejectPaymentProof: (proofId: string, remarks?: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: false,
      isDownloading: false,

      // Fetch all transactions
      fetchAllTransactions: async (latest = false) => {
        set({ isLoading: true });
        try {
          const txns = await getAllTransactions(latest);
          set({ transactions: txns, isLoading: false });
        } catch (err) {
          console.error("Failed to fetch transactions:", err);
          set({ isLoading: false });
        }
      },

      fetchTransactionsByCompany: async (latest = false) => {
        set({ isLoading: true });
        try {
          const txns = await getTransactionsByCompany(latest);
          set({ transactions: txns, isLoading: false });
        } catch (err) {
          console.error("Failed to fetch transactions by company:", err);
          set({ isLoading: false });
        }
      },

      downloadInvoiceById: async (transactionId: string) => {
        set({ isDownloading: true });
        try {
          await downloadInvoice(transactionId);
        } catch (err) {
          console.error("Failed to download invoice:", err);
        } finally {
          set({ isDownloading: false });
        }
      },

      setTransactions: (transactions: Transaction[]) => {
        set({ transactions });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      approvePaymentProof: async (proofId: string, remarks?: string) => {
        try {
          await api.post("/payment-proof/approve", { proofId, remarks });
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.paymentProof?._id === proofId
                ? {
                    ...t,
                    status: "completed",
                    paymentProof: {
                      ...t.paymentProof,
                      status: "approved",
                      remarks,
                    },
                  }
                : t
            ),
          }));
        } catch (err) {
          console.error("Failed to approve payment proof:", err);
          throw err;
        }
      },

      rejectPaymentProof: async (proofId: string, remarks?: string) => {
        try {
          await api.post("/payment-proof/reject", { proofId, remarks });
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.paymentProof?._id === proofId
                ? {
                    ...t,
                    status: "rejected",
                    paymentProof: {
                      ...t.paymentProof,
                      status: "rejected",
                      remarks,
                    },
                  }
                : t
            ),
          }));
        } catch (err) {
          console.error("Failed to reject payment proof:", err);
          throw err;
        }
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
