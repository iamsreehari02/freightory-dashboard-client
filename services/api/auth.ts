import { api } from "@/lib/api";
import { RegisterSchema } from "@/schemas/registerSchema";

export const login = (data: { email: string; password: string }) => {
  return api.post("/api/auth/login", data);
};

export const register = (data: RegisterSchema) => {
  return api.post("/api/auth/register", data);
};
