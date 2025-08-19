import { api } from "@/lib/api";

export const createPayPalOrder = async (amount: number, currency: string = "USD") => {
  const { data } = await api.post("/paypal/create", { amount, currency });
  return data; // { id: "ORDER_ID" }
};

export const capturePayPalOrder = async (orderId: string) => {
  const { data } = await api.post("/paypal/capture", { orderId });
  return data; // captured order details
};
