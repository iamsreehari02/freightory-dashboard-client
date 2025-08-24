import { Contact } from "@/models/contactLead";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const recentContactLeadColumns: ColumnDef<Contact>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <span>{row.original.name ?? "—"}</span>,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => <span>{row.original.email ?? "—"}</span>,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => <span>{row.original.phone ?? "—"}</span>,
  },
  {
    header: "Company",
    accessorKey: "company",
    cell: ({ row }) => <span>{row.original.companyName ?? "—"}</span>,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <span>
          {createdAt ? format(new Date(createdAt), "dd MMM yyyy") : "—"}
        </span>
      );
    },
  },
];
