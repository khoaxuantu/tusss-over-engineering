import { z } from "zod";

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
