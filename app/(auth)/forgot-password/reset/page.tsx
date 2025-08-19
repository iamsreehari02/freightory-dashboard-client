import { Suspense } from "react";
import ResetPassword from "@/components/auth/ResetPassword";
import { GlobalLoading } from "@/components/shared/GlobalLoading";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <ResetPassword />
    </Suspense>
  );
}
