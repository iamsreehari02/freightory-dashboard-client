"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/ui/container";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getStatusBadge } from "@/lib/getBadge";
import { withRoleGuard } from "@/components/auth/AccessControl";
import { Transaction, useTransactionStore } from "@/store/useTransactionsStore";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/lib/api";

const TransactionsPage = () => {
  const {
    transactions,
    isLoading,
    approvePaymentProof: approveProof,
    rejectPaymentProof: rejectProof,
    fetchAllTransactions,
    downloadInvoiceById,
  } = useTransactionStore();

  const [previewTransaction, setPreviewTransaction] =
    useState<Transaction | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllTransactions();
      } catch (err) {
        console.error(err);
        toast.error("Failed to load transactions");
      }
    };
    fetchData();
  }, [fetchAllTransactions]);

  const openPreview = (transaction: Transaction) => {
    setPreviewTransaction(transaction);
    setIsPreviewOpen(true);
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      header: "Transaction ID",
      accessorKey: "transactionNumber",
      cell: ({ row }) => (
        <span className="text-primary">{row.original.transactionNumber}</span>
      ),
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: ({ row }) => row.original.company?.companyName ?? "—",
    },
    { header: "Country", accessorKey: "country" },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        const amount = row.original.amount;
        const currency = row.original.company?.currency || "USD";
        return formatCurrency(amount, currency);
      },
    },
    { header: "Payment Mode", accessorKey: "paymentMode" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              title="Download Invoice"
              onClick={() => downloadInvoiceById(transaction.transactionId)}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="View Proof"
              onClick={() => openPreview(transaction)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Transactions" />
      <DataTable columns={columns} data={transactions} loading={isLoading} />

      {previewTransaction && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <div className="border-b flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Payment Proof
              </DialogTitle>
            </div>

            <div className="flex justify-center p-4">
              {previewTransaction.paymentProof ? (
                <img
                  src={previewTransaction.paymentProof.proofUrl}
                  alt="Payment Proof"
                  className="max-w-full max-h-[60vh] rounded-md object-contain"
                />
              ) : (
                <p className="text-center text-gray-600">
                  No payment proof provided. Please ask the client to submit
                  proof.
                </p>
              )}
            </div>

            {previewTransaction.paymentProof &&
              previewTransaction.paymentProof.status !== "approved" && (
                <div className="flex justify-end gap-4 mt-4 pb-4">
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={async () => {
                      if (!previewTransaction.paymentProof?._id) return;
                      try {
                        await rejectProof(previewTransaction.paymentProof._id);
                        toast.success("Payment proof rejected");
                        setIsPreviewOpen(false);
                      } catch {
                        toast.error("Failed to reject payment proof");
                      }
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={async () => {
                      if (!previewTransaction.paymentProof?._id) return;
                      try {
                        await approveProof(previewTransaction.paymentProof._id);
                        toast.success("Payment proof approved");
                        setIsPreviewOpen(false);
                      } catch {
                        toast.error("Failed to approve payment proof");
                      }
                    }}
                  >
                    Approve
                  </Button>
                </div>
              )}
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
};

export default withRoleGuard(TransactionsPage, ["admin"]);
