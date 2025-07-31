import { z } from "zod";

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
  headOfficeAddress: z.string().min(5),
  country: z.string().min(2),
  pinCode: z.string().min(4),
  freightType: z
    .enum(["Freight Forwarder", "NVOCC"])
    .optional()
    .refine((val): val is "Freight Forwarder" | "NVOCC" => !!val, {
      message: "Please select freight type",
    }),
  password: z.string().min(6),
  confirmPassword: z.string(),
  termsAccepted: z.boolean(),
  branchCount: z.number().min(1),
  costPerBranch: z.number().nonnegative(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
