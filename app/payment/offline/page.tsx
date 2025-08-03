"use client";

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
        {/* Bank Details Card */}
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

            <div className="space-y-4">
              <CardRow label="Account Name" value="ABC Pvt Ltd" />
              <CardRow label="Bank Name" value="HDFC Bank" />
              <CardRow label="Account Number" value="1234567890" />
              <CardRow label="IFSC Code" value="HDFC0001234" />
              <CardRow label="Branch" value="MG Road, Bangalore" />
              <CardRow label="UPI ID" value="abcpvt@hdfcbank" />
            </div>
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  //   className="w-full"
                >
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
