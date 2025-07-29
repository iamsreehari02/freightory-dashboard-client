import { api } from "@/lib/api";
import { RegisterSchema } from "@/schemas/registerSchema";

export const login = (data: { email: string; password: string }) => {
  return api.post("/api/auth/login", data);
};

export const register = (data: RegisterSchema) => {
  return api.post("/api/auth/register", data);
};

export async function requestOtp(payload: { email: string }) {
  return api.post("/api/auth/otp/request", payload);
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const res = await api.post("/api/auth//otp/verify", { email, otp });
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
  return api.post("/api/auth/password/reset", {
    email,
    newPassword,
    confirmPassword,
  });
};
