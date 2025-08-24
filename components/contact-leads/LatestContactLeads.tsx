"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/components/ui/container";
import { Contact } from "@/models/contactLead";
import { useContactStore } from "@/store/useContactLeads";

export default function LatestContactLeads() {
  const { leads, isLoadingList, fetchLeads } = useContactStore();

  useEffect(() => {
    fetchLeads(true).catch(() => toast.error("Failed to load latest leads"));
  }, [fetchLeads]);

  const columns: ColumnDef<Contact>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Company Name", accessorKey: "companyName" },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Latest Contact Leads" />
      <DataTable columns={columns} data={leads} loading={isLoadingList} />
    </PageContainer>
  );
}
