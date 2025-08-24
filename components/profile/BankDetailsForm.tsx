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
import { useEffect, useState } from "react";

import { toast } from "sonner"; // for notifications
import {
  addBankDetails,
  BankDetails,
  getBankDetails,
  updateBankDetails,
} from "@/services/api/bank";

// Schema for validation
const bankDetailsSchema = z.object({
  accountHolderName: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d+$/, "Account number must be numeric"),
  ifscCode: z.string().min(1, "IFSC code is required"),
  branchName: z.string().optional(),
});

type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>;

export default function BankDetailsForm() {
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setLoading(true);
        const response = await getBankDetails();

        if (response?.success && response.bankDetails) {
          const bank = response.bankDetails;

          setBankDetails(bank);
          form.reset({
            accountHolderName: bank.accountHolderName || "",
            bankName: bank.bankName || "",
            accountNumber: bank.accountNumber || "",
            ifscCode: bank.ifscCode || "",
            branchName: bank.branchName || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch bank details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, [form]);

  const onSubmit = async (values: BankDetailsFormValues) => {
    try {
      setLoading(true);

      if (bankDetails?._id) {
        // Update if bank details already exist
        const updated = await updateBankDetails({
          _id: bankDetails._id,
          ...values,
        });
        setBankDetails(updated);
        toast.success("Bank details updated successfully!");
      } else {
        const added = await addBankDetails(values);
        setBankDetails(added);
        toast.success("Bank details added successfully!");
      }
    } catch (error) {
      console.error("Error saving bank details:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <Input
                    {...field}
                    placeholder="Eg: John Doe"
                    disabled={loading}
                  />
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
                  <Input
                    {...field}
                    placeholder="Eg: State Bank of India"
                    disabled={loading}
                  />
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
                  <Input
                    {...field}
                    placeholder="Eg: 123456789012"
                    disabled={loading}
                  />
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
                  <Input
                    {...field}
                    placeholder="Eg: SBIN0001234"
                    disabled={loading}
                  />
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
                  <Input
                    {...field}
                    placeholder="Eg: MG Road Branch"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-max ml-auto">
          <AppButton disabled={loading}>
            {bankDetails?._id ? "Update Bank Details" : "Save Bank Details"}
          </AppButton>
        </div>
      </form>
    </Form>
  );
}
