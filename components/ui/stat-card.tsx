import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextP from "../typography/TextP";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  icon: ReactNode;
  title: string;
  count: number | string;
  loading?: boolean;
  iconBg?: string;
};

export function StatCard({
  icon,
  title,
  count,
  loading = false,
  iconBg = "bg-muted",
}: StatCardProps) {
  return (
    <Card className="w-full h-[96px] border rounded-[8px] opacity-100">
      <CardContent className="flex items-center justify-between p-1 h-full">
        <div className="flex flex-col space-y-1">
          <TextP className="text-sm text-muted-foreground font-medium">
            {title}
          </TextP>
          {loading ? (
            <Skeleton className="h-6 w-16 rounded" />
          ) : (
            <TextP className="font-clash font-bold">
              {typeof count === "number" ? formatNumber(count) : count}
            </TextP>
          )}
        </div>
        <div className={`p-3 rounded-md ${iconBg}`}>{icon}</div>
      </CardContent>
    </Card>
  );
}
