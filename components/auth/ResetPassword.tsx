"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import { AppButton } from "@/components/shared/AppButton";
import { toast } from "sonner";
import { resetPassword } from "@/services/api/auth";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas/resetPasswordSchema";
import PasswordInput from "@/components/form/PasswordInput";
import { AxiosError } from "axios";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!email) {
      toast.error("Email not provided. Redirecting...");
      router.push("/forgot-password");
    }
  }, [email, router]);

  const onSubmit = async (values: ResetPasswordSchema) => {
    try {
      await resetPassword({
        email: email!,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Password reset successfully. Please login.");
      router.push("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card size="lg" className="w-full shadow-xl p-9 max-w-md">
        <CardHeader>
          <AuthCardHeader
            title="Reset Your Password"
            description="Enter a new password below. Make sure it's secure and easy to remember."
            showBackButton={true}
          />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Enter New password"
                      />
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
                    <FormLabel>Re-enter Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Re-enter new password"
                      />
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
                Reset Password
              </AppButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
