"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";
import FileUpload from "./form/FileUpload";
import { Asterisk } from "./ui/asterisk";
import { adminSupportRequest } from "@/services/api/support";
import { AxiosError } from "axios";

// Schema for admin support form
const adminSupportSchema = z.object({
  subject: z.string().min(1, "Subject is required").max(150, "Too long"),
  description: z.string().min(1, "Description is required").max(2000, "Too long"),
  file: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // file optional
        return file instanceof FileList && file.length <= 1;
      },
      { message: "You can upload only one file." }
    ),
});

type AdminSupportFormValues = z.infer<typeof adminSupportSchema>;

export default function AdminSupportForm() {
  const [uploading, setUploading] = useState(false);

  const form = useForm<AdminSupportFormValues>({
    resolver: zodResolver(adminSupportSchema),
    defaultValues: {
      subject: "",
      description: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: AdminSupportFormValues) => {
    setUploading(true);
    try {
      await adminSupportRequest({
        subject: data.subject,
        description: data.description,
      });

      toast.success("Support request sent successfully.");
      form.reset();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message ?? err.message ?? "Failed to send support request."
      );
    } finally {
      setUploading(false);
    }
  };



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 "
        encType="multipart/form-data"
      >
        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Subject <Asterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} disabled={uploading} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Description <Asterisk /></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue or request in detail"
                  {...field}
                  rows={6}
                  disabled={uploading}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FileUpload control={form.control} name="file" disabled={uploading} />


        <div className="w-max ml-auto">
          <AppButton type="submit" disabled={uploading}>
            {uploading ? "Sending..." : "Send Request"}
          </AppButton>
        </div>
      </form>
    </Form>
  );
}
