import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 chars"),
  rate: z.coerce.number().min(1, "Rate must be greater than 0"),
  discount: z.coerce.number().min(0).max(100),
  stock: z.coerce.number().min(0),
  clothType: z.string().min(2, "Cloth type is required"),
});