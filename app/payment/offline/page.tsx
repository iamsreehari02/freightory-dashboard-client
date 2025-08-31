"use client";

import OfflinePaymentPageComponent from "@/components/pages/payment/OfflinePaymentPage";
import PaymentPageComponent from "@/components/pages/payment/PaymentPage";
import { Suspense } from "react";

export default function OfflinePaymentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OfflinePaymentPageComponent />
    </Suspense>
  );
}
