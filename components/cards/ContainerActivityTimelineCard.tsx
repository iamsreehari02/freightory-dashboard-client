"use client";

import { useEffect } from "react";
import clsx from "clsx";
import PageHeader from "../PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useContainerLogStore } from "@/store/useContainerLogStore";
import { formatTimeAgo } from "@/lib/utils";

const actionColors: Record<string, { dot: string; border: string }> = {
  created: { dot: "bg-green-500", border: "border-green-500" },
  removed: { dot: "bg-red-500", border: "border-red-500" },
  updated: { dot: "bg-yellow-500", border: "border-yellow-500" },
  inactivated: { dot: "bg-pink-500", border: "border-pink-500" },
  default: { dot: "bg-blue-500", border: "border-blue-500" },
};

export const ContainerActivityTimelineCard = () => {
  const { logs, fetchLogs, isLoading } = useContainerLogStore();

  useEffect(() => {
    fetchLogs();
  }, []);

  if (isLoading)
    return (
      <p className="text-sm text-muted-foreground">
        Loading container activity...
      </p>
    );

  if (!logs.length)
    return (
      <p className="text-sm text-muted-foreground">
        No container activity yet.
      </p>
    );

  return (
    <Card className="p-4 max-w-none">
      <PageHeader title="Container Activity Timeline" />
      <CardContent className="space-y-4 max-h-80 overflow-y-auto custom-scroll pr-3 pt-2">
        <div className="space-y-3">
          {logs.map((log) => {
            const { dot, border } =
              actionColors[log.action] || actionColors["default"];

            return (
              <div
                key={log._id}
                className={clsx(
                  "bg-muted rounded-md p-4 flex justify-between items-start shadow-sm border-l-4",
                  border
                )}
              >
                <div className="flex items-center space-x-2">
                  <span className={clsx("h-2 w-2 rounded-full", dot)} />
                  <div>
                    <p className="text-sm font-medium">
                      {log.message}{" "}
                      {log.containerId?.containerId &&
                        ` - ${log.containerId.containerId}`}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <p className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                  {formatTimeAgo(log.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
