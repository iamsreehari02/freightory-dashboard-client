"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/ui/container";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { getStatusBadge } from "@/lib/getBadge";
import { withRoleGuard } from "@/components/auth/AccessControl";
import { Transaction, useTransactionStore } from "@/store/useTransactionsStore";

const TransactionsPage = () => {
  const { transactions, isLoading, fetchAllTransactions } =
    useTransactionStore();

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
      cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
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
  ];

  return (
    <PageContainer>
      <PageHeader title="Transactions" />
      <DataTable columns={columns} data={transactions} loading={isLoading} />
    </PageContainer>
  );
};

export default withRoleGuard(TransactionsPage, [
  "admin",
  "freight_forwarder",
  "nvocc",
]);
