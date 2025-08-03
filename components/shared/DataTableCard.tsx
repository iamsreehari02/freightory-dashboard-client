"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageHeader from "@/components/PageHeader";

type DataTableCardProps<TData, TValue> = {
  title: string;
  action?: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
};

export function DataTableCard<TData, TValue>({
  title,
  action,
  columns,
  data,
  loading = false,
}: DataTableCardProps<TData, TValue>) {
  return (
    <Card className="flex-1 bg-white p-4 rounded-lg mb-3 max-w-none">
      <PageHeader title={title} rightContent={action} />
      <DataTable columns={columns} data={data} loading={loading} />
    </Card>
  );
}
