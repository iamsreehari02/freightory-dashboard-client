import { Building, Calendar, CalendarDays, Container, CreditCard, DollarSign, UserCheck, Users } from "lucide-react";
import { Truck, PackageCheck, MapPin, Activity } from "lucide-react";

export const dashboardStatsConfig = [
  {
    key: "members",
    title: "Total Members",
    icon: <Users className="w-6 h-6 text-white" />,
    iconBg: "bg-[#10B981]",
  },
  {
    key: "pendingPayments",
    title: "Pending Payments",
    icon: <DollarSign className="w-6 h-6 text-white" />,
    iconBg: "bg-[#EF4444]",
  },
  {
    key: "availableContainers",
    title: "Available Containers",
    icon: <Container className="w-6 h-6 text-white" />,
    iconBg: "bg-[#3B82F6]",
  },
  {
    key: "upcomingRenewals",
    title: "Upcoming Renewals",
    icon: <CalendarDays className="w-6 h-6 text-white" />,
    iconBg: "bg-[#FBBF24]",
  },
];

export const nvoccDashboardStatsConfig = [
  {
    key: "totalContainers",
    title: "Total Containers",
    icon: <Truck className="w-6 h-6 text-white" />,
    iconBg: "bg-[#3B82F6]",
  },
  {
    key: "availableContainers",
    title: "Available Containers",
    icon: <PackageCheck className="w-6 h-6 text-white" />,
    iconBg: "bg-[#10B981]",
  },
  {
    key: "lastUpdatedPort",
    title: "Last Updated Port",
    icon: <MapPin className="w-6 h-6 text-white" />,
    iconBg: "bg-[#F59E0B]",
  },
  {
    key: "recentActivitiesCount",
    title: "Recent Activities",
    icon: <Activity className="w-6 h-6 text-white" />,
    iconBg: "bg-[#8B5CF6]",
  },
];


export const freightForwarderDashboardStatsConfig = [
  {
    key: "totalBranches",
    title: "Total Branches",
    icon: <Building className="w-6 h-6 text-white" />,
    iconBg: "bg-[#3B82F6]", // blue
  },
  {
    key: "membershipStatus",
    title: "Membership Status",
    icon: <UserCheck className="w-6 h-6 text-white" />,
    iconBg: "bg-[#10B981]", // green
  },
  {
    key: "upcomingRenewals",
    title: "Upcoming Renewals",
    icon: <Calendar className="w-6 h-6 text-white" />,
    iconBg: "bg-[#F59E0B]", // orange
  },
  {
    key: "totalTransactions",
    title: "Total Transactions",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    iconBg: "bg-[#8B5CF6]", // purple
  },
];