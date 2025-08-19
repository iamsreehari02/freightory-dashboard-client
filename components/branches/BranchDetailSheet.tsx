"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBranchStore } from "@/store/useBranchStore";
import { Branch } from "@/models/branch";
import { BranchInfoCard } from "./BranchInfoCard";

type Props = {
  branchId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BranchDetailSheet({ branchId, open, onOpenChange }: Props) {
  const [branch, setBranch] = useState<Branch | null>(null);
  const fetchBranchById = useBranchStore((state) => state.fetchBranchById);

  useEffect(() => {
    if (branchId && open) {
      fetchBranchById(branchId).then(setBranch);
    } else {
      setBranch(null);
    }
  }, [branchId, open, fetchBranchById]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="min-w-[40%]">
        {branch ? (
          <>
            <div>
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold capitalize -mb-5">
                  {branch.name}
                </SheetTitle>
              </SheetHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pt-4 space-y-4">
              <BranchInfoCard branch={branch} />
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">
            Loading branch details...
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
