import { z } from "zod";

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.email().min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});
