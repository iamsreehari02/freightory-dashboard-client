import { Suspense } from "react";
import ResetPassword from "@/components/auth/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
