import { z } from "zod";

export const FormSchema = z.object({
  username: z.string(),
  weight: z.string(),
  height: z.string(),
  age: z.string(),
  gender: z.string(),
  activity_level: z.string(),
  diet_goal: z.string(),
  is_vegan: z.string(),
  is_vegetarian: z.string(),
  is_gluten_free: z.string(),
  is_lactose_free: z.string(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
