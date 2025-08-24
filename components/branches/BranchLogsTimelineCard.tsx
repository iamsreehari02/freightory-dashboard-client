"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { useBranchStore } from "@/store/useBranchStore";
import { BranchLog } from "@/models/branch";
import { formatDate } from "@/lib/utils";
import PageHeader from "../PageHeader";

export function BranchLogsTimelineCard() {
  const { logs, fetchLogs, isLoadingLogs } = useBranchStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Badge based on action
  const getBadge = (action: string) => {
    switch (action) {
      case "deleted":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white text-red-600 border border-red-600 border-[1px]">
            Failed
          </span>
        );
      case "created":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white text-green-600 border border-green-600 border-[1px]">
            Success
          </span>
        );
      case "updated":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white text-yellow-500 border border-yellow-500 border-[1px]">
            Updated
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white text-gray-500 border border-gray-400 border-[1px]">
            Info
          </span>
        );
    }
  };

  // Icon inside a colored circle based on action
  const getActionIcon = (action: string) => {
    let bgColor = "";
    switch (action) {
      case "created":
        bgColor = "bg-green-600";
        break;
      case "updated":
        bgColor = "bg-yellow-500";
        break;
      case "deleted":
        bgColor = "bg-red-600";
        break;
      default:
        bgColor = "bg-gray-400";
    }
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}
      >
        <Building className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <Card className="max-w-none">
      <CardHeader>
        <PageHeader title="Branch Activity Timeline" />
      </CardHeader>
      <CardContent className="space-y-4 max-h-80 overflow-y-auto custom-scroll pr-3">
        {isLoadingLogs && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {!isLoadingLogs && logs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No branch activity found.
          </p>
        )}

        {!isLoadingLogs &&
          logs.map((log: BranchLog) => (
            <div
              key={log._id}
              className="flex items-start border rounded-lg p-3 hover:shadow-sm transition"
            >
              <div className="mr-4">{getActionIcon(log.action)}</div>

              <div className="flex-1 flex flex-col gap-1">
                <span className="font-medium">
                  {log.action.charAt(0).toUpperCase() + log.action.slice(1)}{" "}
                  Branch
                </span>
                <span className="text-sm text-muted-foreground capitalize">
                  {log.message}
                </span>
              </div>
              <div className="w-24 text-sm text-muted-foreground">
                {formatDate(log.createdAt)}
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
