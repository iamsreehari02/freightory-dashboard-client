import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { DetailRow } from "../ui/detail-row";
import { Member } from "@/models/member";
import { formatNumber } from "@/lib/utils";

type Props = {
  member: Member;
};

export function FinancialInfoCard({ member }: Props) {
  const company = member.company;

  if (!company) return null;

  return (
    <Card size="lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          Financial Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 ">
        <DetailRow
          icon={DollarSign}
          label="Cost Per Branch"
          value={formatNumber(company.costPerBranch)}
          valueClassName="font-medium text-green-600"
        />
        <DetailRow
          icon={DollarSign}
          label="Base Registration Fee"
          value={formatCurrency(company.baseRegistrationFee)}
          valueClassName="text-green-600"
        />
        <DetailRow
          icon={DollarSign}
          label="Total Registration Cost"
          value={formatCurrency(company.totalRegistrationCost)}
          valueClassName="text-green-700 font-semibold"
        />
      </CardContent>
    </Card>
  );
}
