import { z } from "zod";

export const sizeSchema = z.object({
  id: z.string(),
  sizeLabel: z.string().min(1, "Size label is required"),
  price: z.coerce.number().positive("Price must be greater than 0").nullable(),
});

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  image: z.string().url("Image must be a valid URL").nullable(),
  price: z.coerce.number().positive("Price must be greater than 0").nullable(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  badgeName: z.string(),
  sizes: z.array(sizeSchema)
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductErrors = Partial<Record<keyof ProductFormData, any>>;
