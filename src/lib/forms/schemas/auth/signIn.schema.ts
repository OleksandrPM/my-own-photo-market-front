import * as z from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string(),
});

export type SignInValues = z.infer<typeof signInSchema>;
