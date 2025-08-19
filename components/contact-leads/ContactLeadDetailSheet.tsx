"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Contact } from "@/models/contactLead";
import { useContactStore } from "@/store/useContactLeads";
import { ContactLeadInfoCard } from "./ContactLeadInfoCard";
import { ContactMessageReplyCard } from "./ContactMessageCard";

type Props = {
  leadId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactLeadDetailSheet({ leadId, open, onOpenChange }: Props) {
  const [lead, setLead] = useState<Contact | null>(null);
  const fetchLeadById = useContactStore((s) => s.fetchLeadById);

  useEffect(() => {
    if (leadId && open) {
      fetchLeadById(leadId).then(setLead);
    } else {
      setLead(null);
    }
  }, [leadId, open, fetchLeadById]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="min-w-[40%]">
        {lead ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                Lead Details
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-5 pt-4 space-y-4">
              <ContactLeadInfoCard lead={lead} />
              <ContactMessageReplyCard message={lead.message} />

            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">
            Loading lead details...
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
