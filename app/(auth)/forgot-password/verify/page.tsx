import { Suspense } from "react";
import OtpVerificationClient from "@/components/auth/OtpVerification";

export default function OtpVerificationPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <OtpVerificationClient />
    </Suspense>
  );
}
