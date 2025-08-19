"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DetailRow } from "@/components/ui/detail-row";
import { Mail, Phone, Building, User, Calendar } from "lucide-react";
import { Contact } from "@/models/contactLead";
import { formatDate } from "@/lib/utils";

type Props = {
  lead: Contact;
};

export function ContactLeadInfoCard({ lead }: Props) {
  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="text-base mb">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DetailRow icon={User} label="Name" value={lead.name} />
        <DetailRow icon={Mail} label="Email" value={lead.email} />
        <DetailRow icon={Phone} label="Phone" value={lead.phone} />
        <DetailRow icon={Building} label="Company" value={lead.companyName} />
        <DetailRow
          icon={Calendar}
          label="Created At"
          value={formatDate(lead.createdAt)}
        />
      </CardContent>
    </Card>
  );
}
