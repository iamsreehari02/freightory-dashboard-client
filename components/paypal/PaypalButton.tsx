"use client";

import { capturePayPalOrder, createPayPalOrder } from "@/services/api/paypal";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PaypalButtonProps {
  amount: string;
  companyId: string;
}

export default function PaypalButton({ amount, companyId }: PaypalButtonProps) {
  const router = useRouter();
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb" }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        // 🔹 Step 1: Ask backend to create the order
        createOrder={async () => {
          try {
            const { id } = await createPayPalOrder(
              parseFloat(amount),
              "USD",
              companyId
            );
            return id;
          } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            console.error("Error creating order:", axiosError);

            if (
              axiosError.response?.data?.error === "Payment already completed"
            ) {
              toast.error(
                "Payment has already been completed for this company."
              );
            } else {
              toast.error("Something went wrong while creating the order.");
            }

            throw error; // re-throw so PayPalButtons knows creation failed
          }
        }}
        // 🔹 Step 2: When approved, ask backend to capture order
        onApprove={async (data) => {
          try {
            if (!data.orderID) throw new Error("Order ID missing");

            const captureResult = await capturePayPalOrder(
              data.orderID,
              companyId
            );
            console.log("Payment Captured:", captureResult);

            if (
              captureResult.success &&
              captureResult.company?.paymentStatus === "completed"
            ) {
              toast.success("Payment successful! You can now login.");
              router.push("/login");
            } else {
              toast.error(
                "Payment captured, but something went wrong updating your account."
              );
            }
          } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            console.error("Error capturing order:", axiosError);
            toast.error("Failed to capture payment. Please try again.");
          }
        }}
      />
    </PayPalScriptProvider>
  );
}
