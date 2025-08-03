import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Member } from "@/store/useMemberStore";
import { Button } from "@/components/ui/button";
import { CountryCell } from "../CountryCell";

export const allMemberColumns: ColumnDef<Member>[] = [
  {
    header: "Company",
    accessorKey: "company.name",
    cell: ({ row }) => <span>{row.original.company?.name ?? "—"}</span>,
  },
  {
    header: "Country",
    accessorKey: "company.country",
    cell: ({ row }) => {
      const country = row.original.company?.country;
      return <CountryCell country={country} />;
    },
  },
  {
    header: "Member Type",
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span className="capitalize px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
          {role.replace("_", " ")}
        </span>
      );
    },
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
      <span
        className={`text-sm px-2 py-1 rounded-sm ${
          row.original.status === "active"
            ? "bg-[#C7FAE6] text-green-600"
            : "bg-[#FDE2E1] text-red-600"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
