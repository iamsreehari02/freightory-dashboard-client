"use client";

import PageHeader from "@/components/PageHeader";
import AdminProfileUpdateForm from "@/components/profile/AdminProfileUpdateForm";
import BankDetailsForm from "@/components/profile/BankDetailsForm";
import PageContainer from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import OtherSettingsTab from "@/components/profile/OtherSettingsTab";

export default function ProfileSettingsPage() {
  return (
    <PageContainer>
      <PageHeader title="Profile Settings" />
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 w-full">
          <TabsTrigger value="admin">Admin Profile</TabsTrigger>
          <TabsTrigger value="bank_details">Bank Account Details</TabsTrigger>
        </TabsList>

        <TabsContent value="admin">
          <AdminProfileUpdateForm />
        </TabsContent>

        <TabsContent value="bank_details">
          <BankDetailsForm />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
