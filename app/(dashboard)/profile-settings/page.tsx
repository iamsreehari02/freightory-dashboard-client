"use client";

import PageHeader from "@/components/PageHeader";
import AdminProfileUpdateForm from "@/components/profile/AdminProfileUpdateForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import OtherSettingsTab from "@/components/profile/OtherSettingsTab";

export default function ProfileSettingsPage() {
  return (
    <div className="p-4 bg-white rounded-lg space-y-4">
      <PageHeader title="Profile Settings" />
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 w-full">
          <TabsTrigger value="admin">Admin Profile</TabsTrigger>
          <TabsTrigger value="other">Bank Account Details</TabsTrigger>
        </TabsList>

        <TabsContent value="admin">
          <AdminProfileUpdateForm />
        </TabsContent>

        <TabsContent value="other">{/* <OtherSettingsTab /> */}</TabsContent>
      </Tabs>
    </div>
  );
}
