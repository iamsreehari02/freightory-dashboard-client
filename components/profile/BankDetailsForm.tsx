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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "../shared/AppButton";

// Schema for validation
const bankDetailsSchema = z.object({
  accountHolderName: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d+$/, "Account number must be numeric"),
  ifscCode: z
    .string()
    .min(1, "IFSC code is required")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  branchName: z.string().optional(),
});

type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>;

export default function BankDetailsForm() {
  const form = useForm<BankDetailsFormValues>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
    },
  });

  const onSubmit = (values: BankDetailsFormValues) => {
    console.log("Bank details submitted:", values);
    // API call will be added later
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: State Bank of India" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: 123456789012" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: SBIN0001234" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branchName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Name (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Eg: MG Road Branch" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-max ml-auto">
          <AppButton>Save Bank Details</AppButton>
        </div>
      </form>
    </Form>
  );
}
