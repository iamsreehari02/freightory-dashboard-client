"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { freightForwarderDashboardStatsConfig } from "@/lib/dashboardStats";
import { getFreightForwarderDashboardStats } from "@/services/api/dashboard";
import { DataTableCard } from "@/components/shared/DataTableCard";
import { recentBranchColumns } from "../tables/branches/RecentBranchColumns";
import { useBranchStore } from "@/store/useBranchStore";
import { UpcomingRenewalsCard } from "../branches/UpcomingRenewalsCard";
import { BranchLogsTimelineCard } from "../branches/BranchLogsTimelineCard";
import { recentTransactionColumns } from "../tables/transactions/RecentTransactionsColumns";
import { useTransactionStore } from "@/store/useTransactionsStore";

export default function FreightForwarderDashboard() {
  const { latestBranches, isLoadingLatest, fetchLatestBranches } =
    useBranchStore();

  const { transactions, fetchTransactionsByCompany, isLoading } =
    useTransactionStore();

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const data = await getFreightForwarderDashboardStats();
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
    fetchLatestBranches();
    fetchTransactionsByCompany(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {freightForwarderDashboardStatsConfig.map((stat, index) => (
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
          title="Recent Branches"
          columns={recentBranchColumns}
          data={latestBranches}
          loading={isLoadingLatest}
        />

        <DataTableCard
          title="Recent Transactions"
          columns={recentTransactionColumns}
          data={transactions}
          loading={isLoading}
        />
      </div>

      {/* Container Activity + Spacer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingRenewalsCard />

        <BranchLogsTimelineCard />
      </div>
    </div>
  );
}
