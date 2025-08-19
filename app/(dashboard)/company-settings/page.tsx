"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import PhoneInputField from "@/components/form/PhoneInputField";
import PageContainer from "@/components/ui/container";
import PageHeader from "@/components/PageHeader";
import { AppButton } from "@/components/shared/AppButton";
import { Textarea } from "@/components/ui/textarea";
import { updateUserAndCompany } from "@/services/api/auth";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Command, CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn, countryOptions } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";


interface CompanyFormData {
  contactPerson: string;
  companyName: string;
  phone: string;
  email: string;
  website?: string;
  country: string;
  pinCode: string;
  headOfficeAddress: string;
}

const CompanySettingsPage = () => {
  const company = useAuthStore((state) => state.company);
  const updateUserInStore = useAuthStore(state => state.updateUser);
  const updateCompanyInStore = useAuthStore(state => state.updateCompany);
  const [open, setOpen] = useState(false);


  const form = useForm<CompanyFormData>({
    defaultValues: {
      contactPerson: "",
      companyName: "",
      phone: "",
      email: "",
      website: "",
      country: "",
      pinCode: "",
      headOfficeAddress: "",
    },
  });

  useEffect(() => {
    if (company) {
      // Map company fields to form data shape
      form.reset({
        contactPerson: company.contactPerson || "",
        companyName: company.companyName || "",
        phone: useAuthStore.getState().user?.phone || "", // get phone from user
        email: useAuthStore.getState().user?.email || "", // get email from user
        website: company.website || "",
        country: company.country || "",
        pinCode: company.pinCode || "",
        headOfficeAddress: company.headOfficeAddress || "",
      });
    }
  }, [company, form]);

  const onSubmit = async (data: CompanyFormData) => {
    // setIsLoading(true);
    // setErrorMsg(null);
    // setSuccessMsg(null);

    try {
      const userData = {
        phone: data.phone,
      };

      const companyData = {
        contactPerson: data.contactPerson,
        companyName: data.companyName,
        website: data.website,
        country: data.country,
        pinCode: data.pinCode,
        headOfficeAddress: data.headOfficeAddress,
      };

      const res = await updateUserAndCompany({ userData, companyData });

      if (res.user) updateUserInStore(res.user);
      if (res.company) updateCompanyInStore(res.company);

      toast.success("Profile updated successfully.");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? err.message ?? "Failed to update profile.");
    } finally {
      // setIsLoading(false);
    }
  };


  return (
    <PageContainer>
      <PageHeader
        title="Company Settings"

      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          {/* Contact Person */}
          <FormField
            control={form.control}
            name="contactPerson"
            rules={{ required: "Contact Person is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Person" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            rules={{ required: "Company Name is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            rules={{ required: "Phone number is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInputField
                        value={field.value}
                        onChange={field.onChange}
                        label={undefined}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            disabled
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between rounded-md h-10 px-3 font-manrope"
                      >
                        {field.value
                          ? countryOptions.find((c) => c.value === field.value)
                            ?.label
                          : "Select country"}
                        <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 max-h-60 overflow-y-auto "
                    align="start"
                    sideOffset={4}
                  >
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryOptions.map((country) => (
                          <CommandItem
                            key={country.value}
                            onSelect={() => {
                              form.setValue("country", country.value);
                              setOpen(false);
                            }}
                          >
                            {country.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === country.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PIN/ZIP Code */}
          <FormField
            control={form.control}
            name="pinCode"
            rules={{ required: "PIN/ZIP Code is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>PIN/ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="PIN/ZIP Code" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Website (full width) */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="website"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="headOfficeAddress"
              rules={{ required: "Address is required" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2 flex justify-end mt-4">
            <AppButton type="submit">Save Changes</AppButton>
          </div>
        </form>

      </Form>

    </PageContainer>

  );
};

export default CompanySettingsPage;
