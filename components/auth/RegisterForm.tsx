"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { AppButton } from "../shared/AppButton";
import { RegisterSchema, registerSchema } from "@/schemas/registerSchema";
import { toast } from "sonner";
import { register } from "@/services/api/auth";
import { Eye, EyeOff, Minus, Plus } from "lucide-react";
import { AxiosError } from "axios";
import { AppDropdown } from "../shared/AppDropdown";
import PasswordInput from "../form/PasswordInput";
import PhoneInputField from "../form/PhoneInputField";
import { Button } from "../ui/button";

export default function RegisterForm() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [branchCount, setBranchCount] = useState(1);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      phone: "",
      email: "",
      website: "",
      headOfficeAddress: "",
      country: "",
      pinCode: "",
      freightType: undefined,
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const freightType = form.watch("freightType");
  const showBranchCounter = freightType === "Freight Forwarder";
  const totalAmount = branchCount * 50;

  async function onSubmit(values: RegisterSchema) {
    try {
      await register(values);
      toast.success("Registered successfully!");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err?.response?.data?.message ?? err?.message ?? "Registration failed";
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Person */}
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Full name of contact person" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInputField
                    label="Phone"
                    value={field.value}
                    onChange={field.onChange}
                    // error={form.formState.errors.phone?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://yourcompany.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Head Office Address */}
          <FormField
            control={form.control}
            name="headOfficeAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Head Office Address</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Full address of your head office"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                <FormControl>
                  <Input placeholder="Country of registration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pin Code */}
          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal / ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Freight Type */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="freightType"
              render={({ field }) => (
                <FormItem>
                  <AppDropdown
                    label="Freight Type"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select freight type"
                    options={[
                      {
                        label: "Freight Forwarder",
                        value: "Freight Forwarder",
                      },
                      { label: "NVOCC", value: "NVOCC" },
                    ]}
                    error={form.formState.errors.freightType?.message}
                  />
                </FormItem>
              )}
            />
          </div>

          {showBranchCounter && (
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center w-full">
                {/* Left label + subtext */}
                <div className="flex flex-col">
                  <label className="text-base font-semibold">
                    Number of Branches
                  </label>
                  <p className="text-sm text-muted-foreground">
                    $50 per branch
                  </p>
                </div>

                {/* Counter + total */}
                <div className="flex items-center gap-6">
                  {/* Counter */}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="w-9 h-9"
                      onClick={() =>
                        setBranchCount((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <Minus className="w-5 h-5" />
                    </Button>

                    <span className="text-lg font-semibold w-8 text-center">
                      {branchCount}
                    </span>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="w-9 h-9"
                      onClick={() => setBranchCount((prev) => prev + 1)}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Total */}
                  <div className="text-base font-medium">
                    Total Amount:{" "}
                    <span className="font-bold text-primary">
                      ${totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Passwords */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Enter password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Re-enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            id="terms"
          />
          <label htmlFor="terms" className="text-sm font-normal leading-snug">
            By registering with MFN you agree to the{" "}
            <a href="/terms" className="text-primary underline" target="_blank">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-primary underline"
              target="_blank"
            >
              Privacy Policy
            </a>{" "}
            set by us.
          </label>
        </div>

        {/* Submit Button */}
        <AppButton
          type="submit"
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          Register Now
        </AppButton>
      </form>
    </Form>
  );
}
