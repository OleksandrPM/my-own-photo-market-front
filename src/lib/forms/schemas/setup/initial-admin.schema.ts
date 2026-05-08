import { z } from "zod";

export const initialAdminSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export type InitialAdminValues = z.infer<typeof initialAdminSchema>;
