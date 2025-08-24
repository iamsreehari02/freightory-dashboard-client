import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { DetailRow } from "../ui/detail-row";
import { Member } from "@/models/member";
import { formatCurrency } from "@/lib/utils";

type Props = {
  member: Member;
};

export function FinancialInfoCard({ member }: Props) {
  const company = member.company;

  if (!company) return null;

  const currencyCode = company.currencyCode || "USD";

  console.log("currency code", currencyCode);

  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          Financial Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 ">
        {company.branchCount > 0 && (
          <DetailRow
            icon={DollarSign}
            label="Cost Per Branch"
            value={formatCurrency(company.costPerBranch, currencyCode)}
          />
        )}
        <DetailRow
          icon={DollarSign}
          label="Base Registration Fee"
          value={formatCurrency(company.baseRegistrationFee ?? 0, currencyCode)}
        />
        <DetailRow
          icon={DollarSign}
          label="Total Registration Cost"
          value={formatCurrency(
            company.totalRegistrationCost ?? 0,
            currencyCode
          )}
          valueClassName=" font-bold"
        />
      </CardContent>
    </Card>
  );
}
