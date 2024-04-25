import { z } from "zod";

export const FormSchema = z.object({
  weight: z.string(),
  height: z.string(),
  age: z.string(),
  gender: z.string(),
  activity_level: z.string(),
  diet_goal: z.string(),
  is_vegan: z.boolean().optional(),
  is_vegetarian: z.boolean().optional(),
  is_gluten_free: z.boolean().optional(),
  is_lactose_free: z.boolean().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
