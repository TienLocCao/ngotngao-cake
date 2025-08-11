export interface Category {
  id: string;
  name: string;
  
  // createdAt: string;
  // updatedAt: string;
}
export  interface CategoryErrors {
  name: string;
}

export interface CategoryFormData {
  name: string;
}

export type CreateCategoryDto = CategoryFormData;

export interface UpdateCategoryDto extends Partial<CategoryFormData> {}