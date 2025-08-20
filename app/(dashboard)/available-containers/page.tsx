"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { Container } from "@/models/container";
import { getFlagImageUrl } from "@/lib/country";
import { getStatusBadge } from "@/lib/getBadge";
import { formatTimeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/components/ui/container";
import { getAvailableContainers } from "@/services/api/containers";
import { withRoleGuard } from "@/components/auth/AccessControl";

const AvailableContainersPage = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableContainers();
        setContainers(data);
      } catch (error) {
        toast.error("Failed to load available containers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: ColumnDef<Container>[] = [
    { header: "Container ID", accessorKey: "containerId" },
    {
      header: "Port",
      accessorKey: "port",
      cell: ({ row }) => {
        const port = row.original.port;
        return typeof port === "string" ? port : port?.name ?? "—";
      },
    },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        const port = row.original.port;
        const country =
          typeof port === "object" && port !== null ? port.country : undefined;
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
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => formatTimeAgo(row.original.createdAt),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Available Containers" />
      <DataTable columns={columns} data={containers} loading={isLoading} />
    </PageContainer>
  );
};

export default withRoleGuard(AvailableContainersPage, ["freight_forwarder"]);
