"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { dashboardStatsConfig } from "@/lib/dashboardStats";
import { getDashboardStats } from "@/services/api/dashboard";
import { DataTableCard } from "@/components/shared/DataTableCard";
import { recentMemberColumns } from "@/components/tables/members/RecentMembersColumns";
import { useMemberStore } from "@/store/useMemberStore";
import { ContainerActivityTimelineCard } from "../cards/ContainerActivityTimelineCard";
import LatestContactLeads from "../contact-leads/LatestContactLeads";
import { useContactStore } from "@/store/useContactLeads";
import { recentContactLeadColumns } from "../tables/contact-leads/RecentContactLeadColumns";

export default function AdminDashboard() {
  const { latestMembers, isLoadingLatest, fetchLatestMembers } =
    useMemberStore();
  const { isLoadingList, fetchLeads, leads } = useContactStore();

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const data = await getDashboardStats();
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
    fetchLatestMembers();
    fetchLeads(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStatsConfig.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={counts[stat.key] ?? 0}
            icon={stat.icon}
            iconBg={stat.iconBg}
            loading={loadingStats}
          />
        ))}
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTableCard
          title="Recent Members"
          columns={recentMemberColumns}
          data={latestMembers}
          loading={isLoadingLatest}
        />

        <DataTableCard
          title="Recent Transactions"
          columns={recentMemberColumns}
          data={latestMembers}
          loading={isLoadingLatest}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ContainerActivityTimelineCard />

        <DataTableCard
          title="Recent Contact Leads"
          columns={recentContactLeadColumns}
          data={leads}
          loading={isLoadingList}
        />
      </div>
    </div>
  );
}
