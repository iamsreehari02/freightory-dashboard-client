"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useBranchStore } from "@/store/useBranchStore";
import { Branch } from "@/models/branch";
import ActionsDropdown from "@/components/shared/ActionsDropdown";
import PageContainer from "@/components/ui/container";
import { AppButton } from "@/components/shared/AppButton";
import { PlusIcon } from "lucide-react";
// Placeholder components
import { ColumnDef } from "@tanstack/react-table";
import CreateBranchModal from "@/components/branches/CreateBranchModal";
import { BranchDetailSheet } from "@/components/branches/BranchDetailSheet";
import { formatDate } from "@/lib/utils";
import { withRoleGuard } from "@/components/auth/AccessControl";
import { useAuthStore } from "@/store/useAuthStore";

const BranchesPage = () => {
  const {
    branches,
    isLoadingList,
    fetchBranches,
    fetchBranchById,
    deleteBranch,
  } = useBranchStore();

  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [modalType, setModalType] = useState<"delete" | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Get the branch count from the AuthStore
  const branchCount = useAuthStore((state) => state.company?.branchCount ?? 0);

  // Fetch branches if company has any
  useEffect(() => {
    if (branchCount > 0) {
      fetchBranches().catch(() => toast.error("Failed to load branches"));
    }
  }, [fetchBranches, branchCount]);

  if (branchCount === 0) {
    return (
      <PageContainer>
        <PageHeader title="All Branches" />
        <p className="text-center text-gray-500 mt-10">
          No branches available. Please add a branch first.
        </p>
      </PageContainer>
    );
  }

  const handleView = async (branch: Branch) => {
    const fullData = await fetchBranchById(branch._id);
    if (fullData) {
      setSelectedBranch(fullData);
      setDetailsOpen(true);
    } else {
      toast.error("Failed to load branch details");
    }
  };

  const handleDelete = async () => {
    if (!selectedBranch) return;

    await deleteBranch(selectedBranch._id);
    toast.success("Branch deleted successfully");
    setModalType(null);
    setSelectedBranch(null);
  };

  // Handle Add New Branch
  const handleAddNewBranch = () => {
    // Check if the branch count from the store is equal to the branches already displayed
    if (branches.length >= branchCount) {
      toast.error("You have reached the maximum number of allowed branches.");
    } else {
      setIsAddNewModalOpen(true);
    }
  };

  const columns: ColumnDef<Branch>[] = [
    { header: "Branch Name", accessorKey: "name" },
    { header: "Contact Person", accessorKey: "contactPerson" },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        return row.original.country;
      },
    },
    {
      header: "Created On",
      accessorKey: "createdOn",
      cell: ({ row }) => {
        return formatDate(row.original.createdAt);
      },
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        const branch = row.original;
        return (
          <ActionsDropdown
            onView={() => handleView(branch)}
            onDelete={() => {
              setSelectedBranch(branch);
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
        title="All Branches"
        rightContent={
          <AppButton onClick={handleAddNewBranch}>
            <span>
              <PlusIcon />
            </span>
            Add New Branch
          </AppButton>
        }
      />

      <DataTable columns={columns} data={branches} loading={isLoadingList} />

      {/* Delete modal */}
      <ConfirmModal
        open={!!modalType}
        onClose={() => {
          setSelectedBranch(null);
          setModalType(null);
        }}
        title="Delete Branch?"
        description={
          <>
            Are you sure you want to delete{" "}
            <strong>{selectedBranch?.name}</strong>? This cannot be undone.
          </>
        }
        confirmText="Delete"
        onConfirm={handleDelete}
        loading={isLoadingList}
      />

      {isAddNewModalOpen && (
        <CreateBranchModal
          open={isAddNewModalOpen}
          onOpenChange={setIsAddNewModalOpen}
        />
      )}

      <BranchDetailSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        branchId={selectedBranch?._id ?? null}
      />
    </PageContainer>
  );
};

export default withRoleGuard(BranchesPage, ["freight_forwarder"]);
