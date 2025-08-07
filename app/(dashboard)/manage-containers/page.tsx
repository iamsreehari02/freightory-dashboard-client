"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useContainerStore } from "@/store/useContainerStore";
import { Container } from "@/models/container";
import ActionsDropdown from "@/components/shared/ActionsDropdown";
import { getFlagImageUrl } from "@/lib/country";
import { getStatusBadge } from "@/lib/getBadge";
import { formatTimeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export default function ContainersPage() {
  const { containers, isLoading, fetchContainers } = useContainerStore();

  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );
  const [modalType, setModalType] = useState<"delete" | null>(null);

  useEffect(() => {
    fetchContainers().catch(() => toast.error("Failed to load containers"));
  }, [fetchContainers]);

  const handleDelete = () => {
    console.log("delete container:", selectedContainer);
    // optional: call delete API
    // then remove it from the store using removeContainer(id)
  };

  const columns: ColumnDef<Container>[] = [
    {
      header: "Container ID",
      accessorKey: "containerId",
    },
    {
      header: "Port",
      accessorKey: "port",
      cell: ({ row }) => row.original.port,
    },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        const country = row.original.country;
        const flagUrl = getFlagImageUrl(country ?? "");

        return (
          <div className="flex items-center gap-2">
            {flagUrl && (
              <img
                src={flagUrl}
                alt={country}
                className="w-5 h-4 border object-cover"
              />
            )}
            <span>{country ?? "—"}</span>
          </div>
        );
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return formatTimeAgo(date);
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },

    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        const container = row.original as Container;

        return (
          <ActionsDropdown
            status={container.status}
            onView={() => console.log("View", container)}
            onEdit={() => console.log("Edit", container)}
            onDelete={() => {
              setSelectedContainer(container);
              setModalType("delete");
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg space-y-4">
      <PageHeader title="All Containers" />
      <DataTable columns={columns} data={containers} loading={isLoading} />

      <ConfirmModal
        open={!!modalType}
        onClose={() => {
          setSelectedContainer(null);
          setModalType(null);
        }}
        title="Delete Container?"
        description={
          <>
            Are you sure you want to delete{" "}
            <strong>{selectedContainer?.containerId}</strong>? This cannot be
            undone.
          </>
        }
        confirmText="Delete"
        onConfirm={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}
