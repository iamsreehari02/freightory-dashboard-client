import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/store/useTransactionsStore";
import { getStatusBadge } from "@/lib/getBadge";
import { formatCurrency } from "@/lib/utils";

export const recentTransactionColumns: ColumnDef<Transaction>[] = [
  {
    header: "Company",
    accessorKey: "company",
    cell: ({ row }) => row.original.company?.companyName ?? "—",
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: ({ row }) => row.original.country ?? "—",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.company?.currency || "USD";
      return formatCurrency(amount, currency);
    },
  },
  {
    header: "Payment Mode",
    accessorKey: "paymentMode",
    cell: ({ row }) => row.original.paymentMode,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
];
