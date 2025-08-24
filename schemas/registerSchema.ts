import { z } from "zod";
import { passwordSchema } from "./password";

export const registerSchema = z
  .object({
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name is too long")
      .trim(),

    contactPerson: z
      .string()
      .min(2, "Contact person must be at least 2 characters")
      .max(50, "Contact person name is too long")
      .trim(),

    phone: z
      .string()
      .nonempty("Phone number is required") // <- ensures it's not empty
      .regex(/^[0-9]{8,15}$/, "Phone must be 8–15 digits"),
    email: z.string().email("Invalid email address").trim(),

    website: z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
        message: "Website must be a valid URL (https://example.com)",
      }),

    headOfficeAddress: z
      .string()
      .trim()
      .min(5, "Head office address must be at least 5 characters")
      .max(300, "Head office address is too long"),

    country: z.string().min(2, "Please select a country"),

    pinCode: z
      .string()
      .regex(/^[0-9]{4,10}$/, "Pin/ZIP code must be 4–10 digits"),

    freightType: z
      .enum(["Freight Forwarder", "NVOCC"])
      .optional()
      .refine((val): val is "Freight Forwarder" | "NVOCC" => !!val, {
        message: "Please select freight type",
      }),

    password: passwordSchema, // assuming passwordSchema already has its own messages
    confirmPassword: passwordSchema, // can add refine later for match

    branchCount: z.number().min(0, "Branch count cannot be negative"),

    costPerBranch: z.number().nonnegative("Cost per branch cannot be negative"),

    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept Terms & Privacy Policy",
    }),
  })
  // Optional: confirm password matches password
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
