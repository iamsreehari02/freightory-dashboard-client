"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { updateUserAndCompany } from "@/services/api/auth";
import { Company } from "@/models/company";
import { Member } from "@/models/member";
import { AppButton } from "../shared/AppButton";
import PhoneInputField from "../form/PhoneInputField";

// Schema for validation
const profileSchema = z.object({
  contactPerson: z.string().min(1, "Required"),
  companyName: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  website: z.string().optional(),
  address: z.string().min(1, "Required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AdminProfileUpdateForm() {
  const { user, company } = useAuthStore();

  const { updateUser, updateCompany } = useAuthStore.getState();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      contactPerson: company?.contactPerson || "",
      companyName: company?.companyName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      website: company?.website || "",
      address: company?.headOfficeAddress || "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    const userData: Partial<Member> = {};
    const companyData: Partial<Company> = {};

    if (values.phone !== user?.phone) userData.phone = values.phone;
    if (values.email !== user?.email) userData.email = values.email;

    if (values.contactPerson !== company?.contactPerson)
      companyData.contactPerson = values.contactPerson;
    if (values.companyName !== company?.companyName)
      companyData.companyName = values.companyName;
    if (values.website !== company?.website)
      companyData.website = values.website;
    if (values.address !== company?.headOfficeAddress)
      companyData.headOfficeAddress = values.address;

    if (
      Object.keys(userData).length === 0 &&
      Object.keys(companyData).length === 0
    ) {
      toast.info("No changes detected");
      return;
    }

    try {
      await updateUserAndCompany({ userData, companyData });

      if (Object.keys(userData).length > 0) updateUser(userData);
      if (Object.keys(companyData).length > 0) updateCompany(companyData);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Contact person name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInputField
                    label=""
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Eg: contact@yourcompany.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: https://yourcompany.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  {...field}
                  placeholder="Enter your address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-max ml-auto">
          <AppButton> Save Changes</AppButton>
        </div>
      </form>
    </Form>
  );
}
