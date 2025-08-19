"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCompanyType, useUserRole } from "@/selectors/authSelectors";
import { getNavItems } from "@/lib/navItems";
import { useAuthStore } from "@/store/useAuthStore";
import { ConfirmModal } from "./ui/confirm-modal";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const userRole = useUserRole();
  const companyType = useCompanyType();
  const logout = useAuthStore((state) => state.logout);

  const navItems = getNavItems(userRole, companyType);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "bg-white border-r transition-all duration-300 h-screen flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div
        className={cn("p-4", collapsed ? "flex justify-center" : "px-6 py-4")}
      >
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={collapsed ? 40 : 200}
          height={52}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
        <nav className="flex flex-col">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link key={href} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2 text-left text-gray-500 cursor-pointer py-6 mt-2",
                    isActive && "bg-primary text-white",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button
          onClick={() => setShowLogoutModal(true)}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-gray-500 cursor-pointer",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 text-red-500" />
          {!collapsed && <span className="truncate text-red-500">Logout</span>}
        </Button>
      </div>
      <ConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logging out?"
        description="Are you sure you want to log out?"
        onConfirm={handleLogout}
        loading={loading}
      />
    </aside>
  );
}
