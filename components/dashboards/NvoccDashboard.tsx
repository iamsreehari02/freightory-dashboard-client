"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { getNvoccDashboardStats } from "@/services/api/dashboard";
import { nvoccDashboardStatsConfig } from "@/lib/dashboardStats";
import { DataTableCard } from "../shared/DataTableCard";
import { useContainerStore } from "@/store/useContainerStore";
import { availableContainerColumns } from "../tables/containers/AvailableContainerColumns";
import { ContainerActivityCard } from "../cards/ContainerActivityCard";

export default function NvoccDashboard() {
  const [counts, setCounts] = useState<Record<string, null>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  const { latestContainers, fetchLatestContainers, isLoading } =
    useContainerStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const data = await getNvoccDashboardStats();
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch NVOCC dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
    fetchLatestContainers();
  }, [fetchLatestContainers]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {nvoccDashboardStatsConfig.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={counts[stat.key] ?? (loadingStats ? 0 : "—")}
            icon={stat.icon}
            iconBg={stat.iconBg}
            loading={loadingStats}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTableCard
          title="Available Containers"
          columns={availableContainerColumns}
          data={latestContainers}
          loading={isLoading}
        />
        <DataTableCard
          title="Recent Transactions"
          columns={availableContainerColumns}
          data={[]}
          loading={isLoading}
        />
      </div>
      <ContainerActivityCard />
    </div>
  );
}
