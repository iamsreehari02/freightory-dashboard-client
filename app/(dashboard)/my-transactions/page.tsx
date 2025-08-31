"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/ui/container";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getStatusBadge } from "@/lib/getBadge";
import { withRoleGuard } from "@/components/auth/AccessControl";
import { Transaction, useTransactionStore } from "@/store/useTransactionsStore";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const MyTransactionsPage = () => {
  const { company } = useAuthStore();
  const {
    transactions,
    isLoading,
    fetchTransactionsByCompany,
    downloadInvoiceById,
  } = useTransactionStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTransactionsByCompany();
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your transactions");
      }
    };

    fetchData();
  }, [fetchTransactionsByCompany, company?._id]);

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
          <Button
            variant="ghost"
            size="icon"
            title="Download Invoice"
            onClick={() => downloadInvoiceById(transaction.transactionId)}
          >
            <Download className="w-4 h-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="My Transactions" />
      <DataTable columns={columns} data={transactions} loading={isLoading} />
    </PageContainer>
  );
};

export default withRoleGuard(MyTransactionsPage, [
  "admin",
  "freight_forwarder",
  "nvocc",
]);
