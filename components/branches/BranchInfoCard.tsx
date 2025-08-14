"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, MapPin, User, Mail, Phone } from "lucide-react";
import { Branch } from "@/models/branch";
import { DetailRow } from "../ui/detail-row";

type Props = {
  branch: Branch;
};

export function BranchInfoCard({ branch }: Props) {
  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          Branch Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DetailRow icon={Building} label="Branch Name" value={branch.name} className="font-bold"/>
        <DetailRow icon={MapPin} label="Country" value={branch.country} />
        <DetailRow icon={MapPin} label="City / State" value={branch.city} />
        <DetailRow icon={User} label="Contact Person" value={branch.contactPerson} />
        <DetailRow icon={Mail} label="Email" value={branch.email} />
        <DetailRow icon={Phone} label="Phone" value={branch.phone} />
        <DetailRow icon={MapPin} label="Created At" value={new Date(branch.createdAt).toLocaleString()} />
        <DetailRow icon={MapPin} label="Updated At" value={new Date(branch.updatedAt).toLocaleString()} />
      </CardContent>
    </Card>
  );
}
