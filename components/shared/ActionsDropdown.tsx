"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash, Pause, Play } from "lucide-react";

type Status =
  | "active"
  | "suspended"
  | "available"
  | "in_use"
  | "maintenance"
  | undefined;

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
  status?: Status;
}

export default function ActionsDropdown({
  onView,
  onEdit,
  onSuspend,
  onDelete,
  status,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-muted-foreground text-xs tracking-wider">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="w-4 h-4 mr-2" />
            View
          </DropdownMenuItem>
        )}

        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
        )}

        {onSuspend && (
          <DropdownMenuItem onClick={onSuspend}>
            {status === "active" || status === "available" ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Suspend
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Activate
              </>
            )}
          </DropdownMenuItem>
        )}

        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-600 focus:bg-red-50"
          >
            <Trash className="w-4 h-4 mr-2 text-destructive" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
