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
import { Member } from "@/store/useMemberStore";
import { MoreHorizontal, Eye, Pencil, Trash, Pause, Play } from "lucide-react";

interface Props {
  member: Member;
  onView: () => void;
  onEdit: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function ActionsDropdown({
  member,
  onView,
  onEdit,
  onSuspend,
  onDelete,
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
        <DropdownMenuItem onClick={onView}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSuspend}>
          {member.status === "active" ? (
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
        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-600 focus:bg-red-50"
        >
          <Trash className="w-4 h-4 mr-2 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
