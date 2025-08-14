"use client";

import { useAuthStore } from "@/store/useAuthStore";
import SupportForm from "@/components/SupportForm";
import AdminSupportForm from "@/components/AdminSupportForm";
import PageContainer from "@/components/ui/container";
import { GlobalLoading } from "@/components/shared/GlobalLoading";
import PageHeader from "@/components/PageHeader";

export default function SupportPage() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <GlobalLoading />;

  if (!user) {
    return (
      <PageContainer>
        <p className="text-center text-red-500">Please login to access support.</p>
      </PageContainer>
    );
  }

  if (user.role === "admin") {
    return (
      <PageContainer>
        <PageHeader title="Help & Contact  Development  Team" />
        <AdminSupportForm />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Help & Contact Admin" />

      <SupportForm />
    </PageContainer>
  );
}
