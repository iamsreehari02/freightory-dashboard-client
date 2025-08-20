"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import { AppButton } from "@/components/shared/AppButton";
import TextP from "@/components/typography/TextP";
import { ActionText } from "@/components/shared/ActionText";
import { toast } from "sonner";
import { OtpInput } from "@/components/shared/OTPInput";
import { verifyOtp } from "@/services/api/auth";
import { AxiosError } from "axios";

export default function OtpVerificationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    if (!email) {
      toast.error("Email not provided. Redirecting...");
      router.push("/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      await verifyOtp({ email: email!, otp: fullOtp });
      toast.success("OTP verified successfully!");
      router.push(`/forgot-password/reset?email=${encodeURIComponent(email!)}`);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message ?? "Invalid OTP";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card size="lg" className="w-full shadow-xl p-9">
        <CardHeader>
          <AuthCardHeader
            title="Enter OTP Code"
            description={`We've sent a 6-digit verification code to your email: ${
              email ?? ""
            }. Please enter the code below to continue.`}
            showBackButton={true}
          />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <OtpInput value={otp} onChange={setOtp} />
            <AppButton type="submit" className="w-full">
              Verify Code
            </AppButton>
          </form>

          <div className="text-center mt-5">
            <TextP className="text-sm text-gray-500">
              Didn&apos;t get the code?{" "}
              <ActionText onClick={() => console.log("trigger otp send")}>
                Resend
              </ActionText>
            </TextP>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
