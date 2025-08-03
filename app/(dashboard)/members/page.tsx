"use client";

import { useEffect } from "react";
import { useMemberStore } from "@/store/useMemberStore";
import { DataTable } from "@/components/shared/DataTable";
import PageHeader from "@/components/PageHeader";
import { allMemberColumns } from "@/components/tables/members/AllMembersTableColumns";

const MembersPage = () => {
  const { allMembers, fetchAllMembers, isLoadingAll } = useMemberStore();

  useEffect(() => {
    fetchAllMembers();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg space-y-4">
      <PageHeader title="All Members" />
      <DataTable
        columns={allMemberColumns}
        data={allMembers}
        loading={isLoadingAll}
      />
    </div>
  );
};

export default MembersPage;
