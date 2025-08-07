"use client";

import { useEffect } from "react";
import PageHeader from "../PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useContainerLogStore } from "@/store/useContainerLogStore";
import { formatTimeAgo } from "@/lib/utils";
import { Plus, Minus, Undo2, X } from "lucide-react";

const actionIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
  created: {
    icon: <Plus className="h-4 w-4 text-green-600" />,
    bg: "bg-green-100",
  },
  removed: {
    icon: <Minus className="h-4 w-4 text-red-600" />,
    bg: "bg-red-100",
  },
  updated: {
    icon: <Undo2 className="h-4 w-4 text-yellow-600" />,
    bg: "bg-yellow-100",
  },
  inactivated: {
    icon: <X className="h-4 w-4 text-pink-600" />,
    bg: "bg-pink-100",
  },
  default: {
    icon: <Plus className="h-4 w-4 text-gray-600" />,
    bg: "bg-gray-100",
  },
};

export const ContainerActivityCard = () => {
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
      <CardContent className="space-y-4">
        <PageHeader title="Container Activity Timeline" />
        <div className="space-y-3">
          {logs.slice(0, 5).map((log) => {
            const { icon, bg } =
              actionIcons[log.action] || actionIcons["default"];

            return (
              <div
                key={log._id}
                className="bg-white rounded-md p-4 flex justify-between items-start shadow-sm border"
              >
                <div className="flex items-center space-x-3">
                  {/* Icon with round bg */}
                  <div className={`p-2 rounded-full ${bg}`}>{icon}</div>

                  {/* Message */}
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
