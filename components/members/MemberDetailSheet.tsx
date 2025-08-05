"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { UserInfoCard } from "./UserInfoCard";
import { FinancialInfoCard } from "./FinancialInfoCard";
import { useMemberStore } from "@/store/useMemberStore";
import { getRoleBadge } from "@/lib/getBadge";
import { Member } from "@/models/member";
import { CompanyInfoCard } from "./CompanyInfoCard";

type Props = {
  memberId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MemberDetailSheet({ memberId, open, onOpenChange }: Props) {
  const [member, setMember] = useState<Member | null>(null);
  const fetchMemberById = useMemberStore((state) => state.fetchMemberById);

  useEffect(() => {
    if (memberId && open) {
      fetchMemberById(memberId).then(setMember);
    } else {
      setMember(null);
    }
  }, [memberId, open, fetchMemberById]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="min-w-[40%]">
        {member ? (
          <>
            <div>
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold capitalize">
                  {member.company?.name}
                  <span className="ml-2">{getRoleBadge(member.role)}</span>
                </SheetTitle>
              </SheetHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pt-4 space-y-4">
              <UserInfoCard member={member} />
              {member.company && <CompanyInfoCard company={member.company} />}

              <FinancialInfoCard member={member} />
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">
            Loading member details...
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
