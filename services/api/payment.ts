import { api } from "@/lib/api";

export interface PaymentSummary {
  companyId: string;
  companyName: string;
  currency: string;
  baseRegistrationFee: number;
  costPerBranch: number;
  branchCount: number;
  totalCost: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentDetails?: {
    orderId?: string;
    transactionId?: string;
    payerId?: string;
    payerEmail?: string;
  };
}

export const getPaymentSummary = async (companyId: string) => {
  const response = await api.get(
    `/companies/payment/summary?companyId=${companyId}`
  );
  return response.data;
};
