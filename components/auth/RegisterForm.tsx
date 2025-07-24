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
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  async function onSubmit(values: RegisterSchema) {
    try {
      await register(values);
      toast.success("Registered successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
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

          {/* Website - full width */}
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

          {/* Head Office Address - full width textarea */}
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

          <FormField
            control={form.control}
            name="freightType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Freight Type</FormLabel>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "Freight Forwarder"}
                      onCheckedChange={() =>
                        field.onChange(
                          field.value === "Freight Forwarder"
                            ? undefined
                            : "Freight Forwarder"
                        )
                      }
                    />
                    <span>Freight Forwarder</span>
                  </label>
                  <label className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      checked={field.value === "NVOCC"}
                      onCheckedChange={() =>
                        field.onChange(
                          field.value === "NVOCC" ? undefined : "NVOCC"
                        )
                      }
                    />
                    <span>NVOCC</span>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Move password fields here in a new row */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Create a strong password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2.5 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Re-enter your password"
                        type={showConfirm ? "text" : "password"}
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2.5 text-muted-foreground"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
