import { z } from "zod";
import { passwordSchema } from "./password";

export const registerSchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  website: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
      message: "Invalid URL",
    }),
  headOfficeAddress: z
    .string()
    .trim()
    .min(1, "Head Office Address is required"),
  country: z.string().min(2),
  pinCode: z.string().min(4),
  freightType: z
    .enum(["Freight Forwarder", "NVOCC"])
    .optional()
    .refine((val): val is "Freight Forwarder" | "NVOCC" => !!val, {
      message: "Please select freight type",
    }),
  password: passwordSchema,
  confirmPassword: passwordSchema,
  termsAccepted: z.boolean(),
  branchCount: z.number().min(1),
  costPerBranch: z.number().nonnegative(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
