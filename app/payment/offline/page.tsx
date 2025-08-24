"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import TextH4 from "@/components/typography/TextH4";
import CardRow from "@/components/shared/CardRow";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import TextP from "@/components/typography/TextP";
import { getBankDetails } from "@/services/api/bank";

// Schema
const proofSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  notes: z.string().optional(),
  file: z
    .any()
    .refine((file) => file?.length === 1, "File is required")
    .refine(
      (file) =>
        file?.[0]?.type === "application/pdf" ||
        file?.[0]?.type.startsWith("image/"),
      "Only PDF or image files are allowed"
    ),
});

type ProofFormData = z.infer<typeof proofSchema>;

export default function OfflinePaymentPage() {
  const form = useForm<ProofFormData>({
    resolver: zodResolver(proofSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const [bankDetails, setBankDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setLoading(true);
        const data = await getBankDetails();
        setBankDetails(data.bankDetails); // ✅ Access the right object
      } catch (err) {
        console.error(err);
        setError("Failed to load bank details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  const onSubmit = async (data: ProofFormData) => {
    const formData = new FormData();
    formData.append("transactionId", data.transactionId);
    formData.append("notes", data.notes || "");
    formData.append("file", data.file[0]);

    console.log("Submitting proof:", Object.fromEntries(formData.entries()));

    toast.success("Payment proof submitted successfully.");
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <AuthCardHeader
        title="Complete Your Offline Payment"
        description="Transfer the amount using the bank details below. Upload your UTR/transaction proof to verify."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-12">
        {/* Bank Details */}
        <Card className="border-2">
          <CardContent className="p-2 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={"/assets/icons/bank-details.svg"}
                alt="bank"
                width={60}
                height={60}
              />
              <TextH4 className="text-xl">Bank Details</TextH4>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading bank details...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : bankDetails ? (
              <div className="space-y-4">
                <CardRow
                  label="Account Holder Name"
                  value={bankDetails?.accountHolderName || "N/A"}
                />
                <CardRow
                  label="Bank Name"
                  value={bankDetails?.bankName || "N/A"}
                />
                <CardRow
                  label="Account Number"
                  value={bankDetails?.accountNumber || "N/A"}
                />
                <CardRow
                  label="IFSC Code"
                  value={bankDetails?.ifscCode || "N/A"}
                />
                <CardRow
                  label="Branch"
                  value={bankDetails?.branchName || "N/A"}
                />
              </div>
            ) : (
              <p className="text-gray-500">No bank details found.</p>
            )}
          </CardContent>
        </Card>

        {/* Upload Proof Form */}
        <Card className="border-2">
          <CardContent className="p-2 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={"/assets/icons/proof.svg"}
                alt="proof"
                width={60}
                height={60}
              />
              <TextH4 className="text-xl">Upload Proof</TextH4>
            </div>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UTR/Transaction ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter UTR or Transaction ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Receipt (PDF/IMG)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Max file size: 5MB</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Add any additional notes here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit & Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <TextP className="text-gray-500 my-20">
        All payments are secure and processed safely
      </TextP>
    </div>
  );
}
