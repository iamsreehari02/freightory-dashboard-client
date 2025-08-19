import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone, Hash, Calendar } from "lucide-react";
import { DetailRow } from "../ui/detail-row";
import { getRoleBadge, getStatusBadge } from "@/lib/getBadge";
import { Member } from "@/models/member";

type Props = {
  member: Member;
};

export function UserInfoCard({ member }: Props) {
  return (
    <Card size="xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground -mb-4">
          User Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DetailRow
          icon={Mail}
          label="Email"
          value={member.email}
          valueClassName="font-medium"
        />
        <DetailRow icon={Phone} label="Phone" value={member.phone} />
        <DetailRow
          icon={Hash}
          label="Status"
          value={getStatusBadge(member.status)}
        />
        <DetailRow icon={Hash} label="Role" value={getRoleBadge(member.role)} />
        <DetailRow
          icon={Calendar}
          label="Member Since"
          value={new Date(member.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </CardContent>
    </Card>
  );
}
