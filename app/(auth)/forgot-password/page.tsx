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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { requestOtp } from "@/services/api/auth";
import { AppButton } from "@/components/shared/AppButton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import TextP from "@/components/typography/TextP";
import { ActionText } from "@/components/shared/ActionText";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordForm() {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      await requestOtp(values);
      toast.success("OTP sent to your email.");
      router.push(
        `/forgot-password/verify?email=${encodeURIComponent(values.email)}`
      );
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err?.response?.data?.message ?? err.message ?? "Failed to send OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card size="lg" className="w-full shadow-xl p-9">
        <CardHeader>
          <AuthCardHeader
            title="Forgot Password"
            description="No worries! Enter your email below and we'll send you a 6-digit code to reset your password."
            showBackButton={true}
          />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AppButton
                type="submit"
                loading={form.formState.isSubmitting}
                className="w-full"
              >
                Send OTP
              </AppButton>
            </form>
          </Form>

          <div className="text-center mt-5">
            <TextP className="text-sm text-gray-500">
              Remember your password?{" "}
              <ActionText href="/login">Login Instead</ActionText>
            </TextP>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
