import { api } from "@/lib/api";

export interface PaymentProof {
  _id: string;
  companyId: {
    _id: string;
    companyName: string;
  };
  transactionId: string;
  amount: number;
  proofUrl: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

// Upload payment proof (user)
export const uploadPaymentProof = async (
  companyId: string,
  transactionId: string,
  file: File,
  notes?: string
) => {
  const formData = new FormData();
  formData.append("companyId", companyId);
  formData.append("transactionId", transactionId);
  formData.append("file", file);
  if (notes) formData.append("notes", notes);

  const response = await api.post(`/payment-proof/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Get all payment proofs (admin)
export const getAllPaymentProofs = async (): Promise<PaymentProof[]> => {
  const response = await api.get("/payment-proof");
  return response.data.data;
};

export const updatePaymentProofStatus = async (
  proofId: string,
  status: "approved" | "rejected",
  remarks?: string
) => {
  const response = await api.patch("/payment-proof/status", {
    proofId,
    status,
    remarks,
  });

  return response.data;
};

export const approvePaymentProof = async (
  proofId: string,
  remarks?: string
) => {
  const response = await api.post("/payment-proof/approve", {
    proofId,
    remarks,
  });

  return response.data;
};

// ✅ Reject a payment proof
export const rejectPaymentProof = async (proofId: string, remarks?: string) => {
  const response = await api.post("/payment-proof/reject", {
    proofId,
    remarks,
  });

  return response.data;
};
