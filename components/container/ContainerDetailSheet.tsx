"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContainerStore } from "@/store/useContainerStore";
import { Container, getContainerDisplayName } from "@/models/container";
import { getStatusBadge } from "@/lib/getBadge";
import { ContainerInfoCard } from "./ContainerInfoCard";

type Props = {
  containerId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContainerDetailSheet({ containerId, open, onOpenChange }: Props) {
  const [container, setContainer] = useState<Container | null>(null);
  const fetchContainerById = useContainerStore((state) => state.fetchContainerById);

  useEffect(() => {
    if (containerId && open) {
      fetchContainerById(containerId).then(setContainer);
    } else {
      setContainer(null);
    }
  }, [containerId, open, fetchContainerById]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="min-w-[40%] ">
        {container ? (
          <>
            <div>
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold capitalize -mb-5">
                  {getContainerDisplayName(container)}
                  <span className="ml-2">{getStatusBadge(container.status)}</span>
                </SheetTitle>
              </SheetHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pt-4 space-y-4">
              <ContainerInfoCard container={container} />
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">
            Loading container details...
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
