import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

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
  badgeId: z.number(),
  categoryId: z.string().min(1, "Category is required"),
  sizes: z.array(sizeSchema),
  
});

export const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image size must be less than 1MB.",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Invalid image format (only JPG, PNG, WEBP are allowed).",
  });

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductErrors = Partial<Record<keyof ProductFormData, any>>;
