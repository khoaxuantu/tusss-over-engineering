import z from "zod";

export type CityNewFormData = z.infer<typeof CityNewSchema>;

export const CityNewSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
});
