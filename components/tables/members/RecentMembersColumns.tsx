import { getFlagImageUrl } from "@/lib/country";
import { Member } from "@/models/member";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const recentMemberColumns: ColumnDef<Member>[] = [
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
      const flagUrl = getFlagImageUrl(country ?? "");

      return (
        <span className="flex items-center gap-2">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={country}
              className="w-5 h-3 object-cover border"
            />
          )}
          {country ?? "—"}
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
      <span className="text-green-600 text-sm bg-[#C7FAE6] p-1 rounded-sm">
        {row.original.status}
      </span>
    ),
  },
];
