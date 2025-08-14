"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import PageContainer from "@/components/ui/container";
import { Eye } from "lucide-react";
import { Contact } from "@/models/contactLead";
import { useContactStore } from "@/store/useContactLeads";
import { Button } from "@/components/ui/button";
import { ContactLeadDetailSheet } from "@/components/contact-leads/ContactLeadDetailSheet";

export default function ContactLeadsPage() {
  const { leads,isLoadingList, fetchLeads } = useContactStore();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    fetchLeads().catch(() => toast.error("Failed to load leads"));
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
    {
      header: "",
      id: "actions",
      cell: ({ row }) => (
        <Button
        variant="ghost"
          onClick={() => {
            setSelectedLeadId(row.original._id); 
            setIsSheetOpen(true);
          }}
          className="p-1 hover:text-primary"
        >
          <Eye className="w-5 h-5" />
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Contact Leads" />
      <DataTable columns={columns} data={leads} loading={isLoadingList} />

      <ContactLeadDetailSheet
        leadId={selectedLeadId}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </PageContainer>
  );
}
