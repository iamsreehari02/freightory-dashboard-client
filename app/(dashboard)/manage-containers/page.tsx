"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { getAllContainers } from "@/services/api/containers";
import { Container } from "@/models/container";
import ActionsDropdown from "@/components/shared/ActionsDropdown";

export default function ContainersPage() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );
  const [modalType, setModalType] = useState<"delete" | null>(null);

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const res = await getAllContainers(); // API call
      setContainers(res);
    } catch (error) {
      toast.error("Failed to load containers");
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   if (!selectedContainer) return;
  //   setLoading(true);
  //   try {
  //     await deleteContainer(selectedContainer._id);
  //     toast.success("Container deleted successfully");
  //     setContainers((prev) =>
  //       prev.filter((c) => c._id !== selectedContainer._id)
  //     );
  //   } catch (error) {
  //     toast.error("Failed to delete container");
  //   } finally {
  //     setLoading(false);
  //     setModalType(null);
  //     setSelectedContainer(null);
  //   }
  // };

  const handleDelete = () => {
    console.log("deleted");
  };

  const columns = [
    {
      header: "Container ID",
      accessorKey: "containerId",
    },
    {
      header: "Type",
      accessorKey: "containerType",
    },
    {
      header: "Company",
      accessorKey: "company.name",
      cell: ({ row }: any) => row.original.companyId?.companyName ?? "—",
    },
    {
      header: "Country",
      accessorKey: "company.country",
      cell: ({ row }: any) => row.original.country ?? "—",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <span
          className={`text-sm px-2 py-1 rounded-sm ${
            row.original.status === "available"
              ? "bg-[#C7FAE6] text-green-600"
              : "bg-[#FDE2E1] text-red-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }: any) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }: any) => {
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
      <DataTable columns={columns} data={containers} loading={loading} />

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
        loading={loading}
      />
    </div>
  );
}
