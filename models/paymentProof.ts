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
