"use client";

import { useEffect, useState } from "react";
import { useMemberStore } from "@/store/useMemberStore";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import ActionsDropdown from "@/components/shared/ActionsDropdown";
import { deleteUser, suspendUser } from "@/services/api/members";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { MemberDetailSheet } from "@/components/members/MemberDetailSheet";
import { Member } from "@/models/member";
import { getFlagImageUrl } from "@/lib/country";
import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/components/ui/container";

export default function MembersPage() {
  const { allMembers, fetchAllMembers, isLoadingAll, mutateMember } =
    useMemberStore();
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);
  const [modalType, setModalType] = useState<"delete" | "suspend" | null>(null);
  const [viewMemberId, setViewMemberId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await deleteUser(selectedUser._id);
      toast.success("User deleted successfully");
      mutateMember("delete", selectedUser._id);
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      setSelectedUser(null);
      setModalType(null);
    }
  };

  const handleSuspend = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      const suspend = selectedUser.status === "active";
      const newStatus = suspend ? "suspended" : "active";
      await suspendUser(selectedUser._id, suspend);
      toast.success(
        `User ${suspend ? "suspended" : "re-activated"} successfully`
      );
      mutateMember("suspend", selectedUser._id, { status: newStatus });
    } catch (error) {
      toast.error("Failed to update user status");
    } finally {
      setLoading(false);
      setSelectedUser(null);
      setModalType(null);
    }
  };

  const getConfirmConfig = () => {
    if (!selectedUser) {
      return {
        title: "",
        description: "",
        confirmText: "",
        onConfirm: () => {},
      };
    }

    if (modalType === "delete") {
      return {
        title: "Delete Member?",
        description: (
          <>
            Are you sure you want to delete{" "}
            <strong className="capitalize">
              {selectedUser.company?.name ?? "this company"}
            </strong>
            ? This cannot be undone.
          </>
        ),
        confirmText: "Delete",
        onConfirm: handleDelete,
      };
    }

    if (modalType === "suspend") {
      const actionText =
        selectedUser.status === "active" ? "suspend" : "re-activate";
      return {
        title: `${
          actionText.charAt(0).toUpperCase() + actionText.slice(1)
        } Member?`,
        description: (
          <>
            Do you want to {actionText}{" "}
            <strong className="capitalize">
              {selectedUser.company?.name ?? "this company"}
            </strong>
            ?
          </>
        ),
        confirmText: actionText === "suspend" ? "Suspend" : "Activate",
        onConfirm: handleSuspend,
      };
    }

    return {
      title: "",
      description: "",
      confirmText: "",
      onConfirm: () => {},
    };
  };

  const columns: ColumnDef<Member>[] = [
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
          <div className="flex items-center gap-2">
            {flagUrl && (
              <img
                src={flagUrl}
                alt={country}
                className="w-5 h-4  border object-cover"
              />
            )}
            <span>{country ?? "—"}</span>
          </div>
        );
      },
    },

    {
      header: "Member Type",
      accessorKey: "role",
      cell: ({ row }) => (
        <span className="capitalize px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
          {row.original.role.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Joined",
      accessorKey: "createdAt",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
      header: "",
      id: "actions",
      cell: ({ row }) => {
        const user = row.original as Member;

        return (
          <ActionsDropdown
            status={user.status}
            onView={() => setViewMemberId(user._id)}
            onSuspend={() => {
              setSelectedUser(user);
              setModalType("suspend");
            }}
            onDelete={() => {
              setSelectedUser(user);
              setModalType("delete");
            }}
          />
        );
      },
    },
  ];

  const { title, description, confirmText, onConfirm } = getConfirmConfig();

  return (
    <PageContainer>
      <PageHeader title="All Members" />
      <DataTable columns={columns} data={allMembers} loading={isLoadingAll} />

      <ConfirmModal
        open={!!modalType}
        onClose={() => {
          setSelectedUser(null);
          setModalType(null);
        }}
        title={title}
        description={description}
        confirmText={confirmText}
        onConfirm={onConfirm}
        loading={loading}
      />

      {viewMemberId && (
        <MemberDetailSheet
          open={!!viewMemberId}
          memberId={viewMemberId}
          onOpenChange={() => setViewMemberId(null)}
        />
      )}
    </PageContainer>
  );
}
