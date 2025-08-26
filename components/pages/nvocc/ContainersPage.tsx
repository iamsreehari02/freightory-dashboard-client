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
import { formatDate, formatTimeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/components/ui/container";
import { AppButton } from "@/components/shared/AppButton";
import { PlusIcon } from "lucide-react";
import CreateContainerModal from "@/components/container/CreateContainerModal";
import { ContainerDetailSheet } from "@/components/container/ContainerDetailSheet";

export default function ContainersPage() {
  const {
    containers,
    isLoading,
    fetchContainers,
    fetchContainerById,
    removeContainer,
  } = useContainerStore();

  const [isAddNewModelOpen, setIsAddNewModelOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );
  const [modalType, setModalType] = useState<"delete" | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchContainers().catch(() => toast.error("Failed to load containers"));
  }, [fetchContainers]);

  const handleView = async (container: Container) => {
    const fullData = await fetchContainerById(container._id);
    if (fullData) {
      setSelectedContainer(fullData);
      setDetailsOpen(true);
    } else {
      toast.error("Failed to load container details");
    }
  };

  const handleDelete = async () => {
    if (!selectedContainer) return;

    const success = await removeContainer(selectedContainer._id);
    if (success) {
      toast.success("Container deleted successfully");
      setModalType(null);
      setSelectedContainer(null);
    } else {
      toast.error("Failed to delete container");
    }
  };

  const columns: ColumnDef<Container>[] = [
    {
      header: "Container ID",
      accessorKey: "containerId",
      cell: ({ row }) => (
        <span className="text-primary font-medium">
          {row.original.containerId}
        </span>
      ),
    },
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
      header: "Available Units",
      accessorKey: "unitsAvailable",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-800">
          {row.original.unitsAvailable}
        </span>
      ),
    },
    {
      header: "Available From",
      accessorKey: "availableFrom",
      cell: ({ row }) => formatDate(row.original.availableFrom),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      header: "Agent Details",
      accessorKey: "agentDetails",
      cell: ({ row }) => {
        const details = row.original.agentDetails
          ? row.original.agentDetails.split("\n")
          : [];

        return (
          <div
            className="text-gray-700 text-sm max-w-[200px] truncate"
            title={row.original.agentDetails}
          >
            {details.length > 0 ? (
              <div className="flex flex-col">
                {details.map((line: string, index: number) => (
                  <span key={index} className="leading-5 truncate">
                    {line.trim() || "—"}
                  </span>
                ))}
              </div>
            ) : (
              "—"
            )}
          </div>
        );
      },
    },

    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        const container = row.original as Container;
        return (
          <ActionsDropdown
            status={container.status}
            onView={() => handleView(container)}
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
    <PageContainer>
      <PageHeader
        title="All Containers"
        rightContent={
          <AppButton onClick={() => setIsAddNewModelOpen(true)}>
            <span>
              <PlusIcon />
            </span>
            Add New Container
          </AppButton>
        }
      />
      <DataTable columns={columns} data={containers} loading={isLoading} />

      {/* Delete modal */}
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

      {/* Create modal */}
      {isAddNewModelOpen && (
        <CreateContainerModal
          open={isAddNewModelOpen}
          onOpenChange={setIsAddNewModelOpen}
        />
      )}

      <ContainerDetailSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        containerId={selectedContainer?._id ?? null}
      />
    </PageContainer>
  );
}
