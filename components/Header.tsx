"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/useAuthStore";
import { Bell, PanelRightOpen, Search } from "lucide-react";
import { AvatarFallback } from "./AvatarFallback";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const company = useAuthStore((state) => state.company);
  const userType = useAuthStore((state) => state.user?.role);
  const name = user?.email || "User";

  console.log("company in headeeer", company);

  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b bg-background">
      {/* Sidebar toggle + Company Info */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <PanelRightOpen className="h-5 w-5" />
        </Button>

        {company && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium capitalize">
              {company.companyName}
            </span>
            {userType && (
              <Badge
                variant="outline"
                className={`
      text-xs px-2 py-0.5 rounded-full font-semibold
      ${
        userType === "admin"
          ? "bg-purple-100 text-purple-700 border-purple-300"
          : userType === "freight_forwarder"
          ? "bg-blue-100 text-blue-700 border-blue-300"
          : "bg-green-100 text-green-700 border-green-300"
      }
    `}
              >
                {userType === "nvocc"
                  ? "NVOCC"
                  : userType
                      .toLowerCase()
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <div className="relative w-full max-w-sm">
          <Input type="text" placeholder="Search..." className="pr-10" />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Bell className="h-5 w-5 text-muted-foreground" />
        <AvatarFallback name={name} size={30} />
      </div>
    </header>
  );
}
