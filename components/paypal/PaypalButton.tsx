"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalButton({ amount }: { amount: string }) {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb" }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          if (!actions.order) return Promise.reject("Order API not available");

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (!actions.order) return Promise.reject("Order API not available");

          return actions.order.capture().then((details) => {
            // ✅ Use the captured details here
            console.log("Payment Approved:", details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
