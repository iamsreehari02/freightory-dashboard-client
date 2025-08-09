"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "@/components/shared/AppButton";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/ui/container";

// Schema
const supportSchema = z.object({
  feedback: z
    .string()
    .min(1, "Feedback or support request is required")
    .max(1000, "Message is too long"),
});

type SupportFormValues = z.infer<typeof supportSchema>;

export default function SupportPage() {
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const onSubmit = (values: SupportFormValues) => {
    console.log("Support request submitted:", values);
    // API integration later
  };

  return (
    <PageContainer>
      <PageHeader title="Help  Contact  Development  Team" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback or Support Request</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your feedback or request here..."
                    className="min-h-56"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-max ml-auto">
            <AppButton type="submit">Submit</AppButton>
          </div>
        </form>
      </Form>
    </PageContainer>
  );
}
