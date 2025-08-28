import { api } from "@/lib/api";

export const createPayPalOrder = async (
  amount: number,
  currency: string = "USD",
  companyId: string
) => {
  const { data } = await api.post("/paypal/create", {
    amount,
    currency,
    companyId,
  });
  return data; // { id: "ORDER_ID" }
};

export const capturePayPalOrder = async (
  orderID: string,
  companyId: string
) => {
  const { data } = await api.post("/paypal/capture", {
    orderID,
    companyId,
  });
  return data; // captured order details
};
