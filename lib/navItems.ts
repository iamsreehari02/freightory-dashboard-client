import {
  LayoutDashboard,
  LockKeyhole,
  MessageCircleQuestionMark,
  Settings,
  Users,
  FileText,
  Container,
  Building,
  Building2,
  Users2,
  CreditCard,
  SquareUserRound,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export const getNavItems = (
  userRole: string | null,
  companyType: string | null
): NavItem[] => {
  const baseItems: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const roleBasedItems: NavItem[] = [];

  // Admin-only
  if (userRole === "admin") {
    roleBasedItems.push({ href: "/members", label: "Members", icon: Users });
    roleBasedItems.push({
      href: "/transactions",
      label: "Transactions",
      icon: CreditCard,
    });
    roleBasedItems.push({
      href: "/contact-leads",
      label: "Contact Leads",
      icon: SquareUserRound,
    });
    roleBasedItems.push({
      href: "/profile-settings",
      label: "Profile Settings",
      icon: Settings,
    });
  }

  // Freight forwarder or NVOCC
  if (userRole === "freight_forwarder" || userRole === "nvocc") {
    roleBasedItems.push({
      href: "/company-settings",
      label: "Company Settings",
      icon: Building,
    });

    roleBasedItems.push({
      href: "/my-invoices",
      label: "My Invoices",
      icon: FileText,
    });
  }

  // NVOCC-specific
  if (userRole === "nvocc") {
    roleBasedItems.push({
      href: "/manage-containers",
      label: "Manage Containers",
      icon: Container,
    });
  }

  if (userRole === "freight_forwarder" || userRole === "nvooc") {
    roleBasedItems.push({
      href: "/available-containers",
      label: "Available Containers",
      icon: FileText,
    });
    roleBasedItems.push({
      href: "/manage-branches",
      label: "Manage Branches",
      icon: Building2,
    });
  }

  const commonItems: NavItem[] = [
    {
      href: "/support",
      label: "Help / Support",
      icon: MessageCircleQuestionMark,
    },
  ];

  return [...baseItems, ...roleBasedItems, ...commonItems];
};
