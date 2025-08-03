import { api } from "@/lib/api";
import { RegisterSchema } from "@/schemas/registerSchema";

export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const register = (data: RegisterSchema) => {
  return api.post("/auth/register", data);
};

export async function requestOtp(payload: { email: string }) {
  return api.post("/auth/otp/request", payload);
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const res = await api.post("/auth//otp/verify", { email, otp });
  return res.data;
}

export const resetPassword = async ({
  email,
  newPassword,
  confirmPassword,
}: {
  email: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return api.post("/auth/password/reset", {
    email,
    newPassword,
    confirmPassword,
  });
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
