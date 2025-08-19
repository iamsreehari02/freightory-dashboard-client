import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Transaction = {
  invoiceId: string;
  company: { name: string };
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed";
};

export const recentTransactionsColumns: ColumnDef<Transaction>[] = [
  {
    header: "Invoice ID",
    accessorKey: "invoiceId",
    cell: ({ row }) => <span>{row.original.invoiceId}</span>,
  },
  {
    header: "Company",
    accessorKey: "company.name",
    cell: ({ row }) => <span>{row.original.company?.name ?? "—"}</span>,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => <span>₹{row.original.amount.toLocaleString()}</span>,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => {
      const formatted = format(new Date(row.original.date), "dd MMM yyyy");
      return <span>{formatted}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor = {
        paid: "bg-[#C7FAE6] text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`text-sm px-2 py-1 rounded-sm capitalize ${statusColor[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="icon" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
