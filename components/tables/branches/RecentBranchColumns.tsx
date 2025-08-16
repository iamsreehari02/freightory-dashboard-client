import { getFlagImageUrl } from "@/lib/country";
import { Branch } from "@/models/branch";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const recentBranchColumns: ColumnDef<Branch>[] = [
  {
    header: "Branch Name",
    accessorKey: "name",
    cell: ({ row }) => <span>{row.original.name ?? "—"}</span>,
  },
  {
    header: "Contact Person",
    accessorKey: "contactPerson",
    cell: ({ row }) => <span>{row.original.contactPerson ?? "—"}</span>,
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: ({ row }) => {
      const country = row.original.country;
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
    header: "Created On",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt
        ? format(new Date(row.original.createdAt), "dd MMM yyyy")
        : "—";
      return <span>{date}</span>;
    },
  },
];
