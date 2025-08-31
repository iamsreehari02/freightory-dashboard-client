"use client";

import PaymentPageComponent from "@/components/pages/payment/PaymentPage";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentPageComponent />
    </Suspense>
  );
}
