import { getFlagImageUrl } from "@/lib/country";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { getStatusBadge } from "@/lib/getBadge";
import { Container } from "@/models/container";
import { formatDate } from "@/lib/utils";

export const availableContainerColumns: ColumnDef<Container>[] = [
  {
    header: "Port",
    accessorKey: "port",
    cell: ({ row }) => {
      const port = row.original.port;
      return typeof port === "string" ? port : port?.name ?? "—";
    }
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: ({ row }) => {
      const port = row.original.port;

      const country =
        typeof port === "object" && port !== null
          ? port.country
          : undefined;

      const flagUrl = getFlagImageUrl(country ?? "");

      return (
        <span className="flex items-center gap-2">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={country ?? ""}
              className="w-5 h-3 object-cover border"
            />
          )}
          {country ?? "—"}
        </span>
      );
    },
  },

  {
    header: "Available Units",
    accessorKey: "unitsAvailable",
    cell: ({ row }) => {
      const units = row.original.unitsAvailable;

      let label = "Low";
      let colorClass = "text-red-600 bg-red-100";

      if (units > 50) {
        label = "High";
        colorClass = "text-green-600 bg-green-100";
      } else if (units > 20) {
        label = "Medium";
        colorClass = "text-yellow-600 bg-yellow-100";
      }

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{units}</span>
          <span
            className={`text-xs font-semibold ${colorClass} px-2 py-0.5 rounded-full`}
          >
            {label}
          </span>
        </div>
      );
    },
  },
  {
    header: "Available From",
    accessorKey: "availableFrom",
    cell: ({ row }) => {
      const date = row.original.availableFrom;
      return <span>{formatDate(date)}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return getStatusBadge(status);
    },
  },
];
