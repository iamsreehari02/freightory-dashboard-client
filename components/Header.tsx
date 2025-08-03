"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, PanelRightOpen, Search, User } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b bg-background">
      {/* Sidebar toggle */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <PanelRightOpen className="h-5 w-5" />
        </Button>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-7 flex-1 justify-end">
        <div className="relative w-full max-w-sm">
          <Input type="text" placeholder="Search..." className="pr-10" />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Bell className="h-5 w-5 text-muted-foreground" />
        <User className="h-5 w-5 text-muted-foreground" />
      </div>
    </header>
  );
}
