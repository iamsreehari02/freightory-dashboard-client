import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, Globe, MapPin, User2 } from "lucide-react";
import { DetailRow } from "../ui/detail-row";
import { Company } from "@/models/company";
import { getCompanyAddress, getFreightTypeLabel } from "@/models/company";

type Props = {
  company: Company;
};

export function CompanyInfoCard({ company }: Props) {
  return (
    <Card size="xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          Company Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DetailRow
          icon={Briefcase}
          label="Name"
          value={company.name}
          valueClassName="font-medium"
        />
        <DetailRow
          icon={User2}
          label="Contact Person"
          value={company.contactPerson}
        />
        <DetailRow icon={Globe} label="Website" value={company.website} />
        <DetailRow
          icon={MapPin}
          label="Address"
          value={getCompanyAddress(company)}
        />
        <DetailRow
          icon={Briefcase}
          label="Freight Type"
          value={getFreightTypeLabel(company.freightType)}
        />
      </CardContent>
    </Card>
  );
}
