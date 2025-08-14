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
import { AppButton } from "@/components/shared/AppButton";
import { useAuthStore } from "@/store/useAuthStore";
import { Asterisk } from "@/components/ui/asterisk";
import { submitSupportRequest } from "@/services/api/support";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Schema
const supportSchema = z.object({
  name: z.string(),
  memberType: z.string(),
  email: z.string().email(),
  subject: z.string().min(1, "Subject is required").max(150, "Too long"),
  feedback: z
    .string()
    .min(1, "Feedback or support request is required")
    .max(1000, "Message is too long"),
});

type SupportFormValues = z.infer<typeof supportSchema>;

export default function SupportForm() {
  const { user, company } = useAuthStore();

  const currentUser = {
    name: company?.contactPerson || "",
    memberType: company?.freightType || "",
    email: user?.email || "",
  };

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: currentUser.name,
      memberType: currentUser.memberType,
      email: currentUser.email,
      subject: "",
      feedback: "",
    },
  });

  const onSubmit = async (values: SupportFormValues) => {
    try {
      await submitSupportRequest({
        subject: values.subject,
        feedback: values.feedback,
      });
      toast.success("Your request has been submitted successfully");
      form.reset({
        ...form.getValues(),
        subject: "",
        feedback: "",
      });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message ?? err.message ?? "Failed to send OTP"
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full"
      >
        {/* User Info - Disabled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memberType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Type</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject <Asterisk />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter subject" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback */}
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Feedback or Support Request <Asterisk />
              </FormLabel>
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
  );
}
