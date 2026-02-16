import * as z from "zod";

export const signUpSchema = z.object({
  avatar: z
    .instanceof(File)
    .nullable()
    .optional()
    .or(z.literal(null))
    .or(z.undefined())
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Avatar must be an image",
    ),

  username: z
    .string()
    .max(30, "Max 30 chars")
    .nullable()
    .transform((v) => (v === "" ? null : v)),

  email: z.email("Invalid email"),

  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one symbol" }),
});

export type SignUpFormInput = z.input<typeof signUpSchema>;
export type SignUpValues = z.output<typeof signUpSchema>;
