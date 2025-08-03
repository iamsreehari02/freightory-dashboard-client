import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Member } from "@/store/useMemberStore";

export const recentMemberColumns: ColumnDef<Member>[] = [
  {
    header: "Company",
    accessorKey: "company.name",
    cell: ({ row }) => <span>{row.original.company?.name ?? "—"}</span>,
  },
  {
    header: "Country",
    accessorKey: "company.country",
    cell: ({ row }) => <span>{row.original.company?.country ?? "—"}</span>,
  },
  {
    header: "Joined",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = format(new Date(row.original.createdAt), "dd MMM yyyy");
      return <span>{date}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className="text-green-600 text-sm bg-[#C7FAE6] p-1 rounded-sm">
        {row.original.status}
      </span>
    ),
  },
];
