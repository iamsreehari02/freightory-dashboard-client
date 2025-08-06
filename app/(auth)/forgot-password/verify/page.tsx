import { Suspense } from "react";
import OtpVerificationClient from "@/components/auth/OtpVerification";
import { GlobalLoading } from "@/components/shared/GlobalLoading";

export default function OtpVerificationPage() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <OtpVerificationClient />
    </Suspense>
  );
}
