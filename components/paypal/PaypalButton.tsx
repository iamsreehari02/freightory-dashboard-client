"use client";

import { capturePayPalOrder, createPayPalOrder } from "@/services/api/paypal";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalButton({ amount }: { amount: string }) {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb" }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        // 🔹 Step 1: Ask backend to create the order
        createOrder={async () => {
          try {
            const { id } = await createPayPalOrder(parseFloat(amount), "USD");
            return id; // return orderId from backend
          } catch (error) {
            console.error("Error creating order:", error);
            throw error;
          }
        }}
        // 🔹 Step 2: When approved, ask backend to capture order
        onApprove={async (data) => {
          try {
            if (!data.orderID) throw new Error("Order ID missing");
            const captureResult = await capturePayPalOrder(data.orderID);
            console.log("✅ Payment Captured:", captureResult);

            // 👉 Here you can:
            // - Update your DB (mark registration as paid)
            // - Redirect user to success page
          } catch (error) {
            console.error("Error capturing order:", error);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
