import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export type SignInValues = z.infer<typeof signInSchema>;

export type SignInFormValues = SignInValues & {
  root?: {
    serverError?: string;
  };
};
