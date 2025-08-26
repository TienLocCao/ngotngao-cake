// export type ProductStatus = 'Best Seller' | 'New';
// export const ProductStatusOptions: {
//   key: 'best-selling' | 'newest';
//   label: string;
// }[] = [{
//   key: 'best-selling',
//   label: 'Best Seller'
// }, {
//   key: 'newest',
//   label: 'New'
// }];

export interface Product {
  id: string;
  name: string;
  image: string | null;
  price: number | null;
  description: string;
  badgeId: number;
  categoryId: string;
  badgeName?: string;
  sizes: { id: string; sizeLabel: string; price: number | null }[];
  // createdAt: string;
  // updatedAt: string;
}
export  interface ProductErrors {
  name: string;
  image: string;
  price: string;
  description: string;
  categoryId: string;
  sizes: { id: string; sizeLabel: string; price: string }[];
}

export interface ProductFormData {
  name: string;
  image: string | null;
  price: number | null;
  description: string;
  badgeId: number;
  categoryId: string;
  sizes: { id: string; sizeLabel: string; price: number | null }[];
}

export type CreateProductDto = ProductFormData;

export interface UpdateProductDto extends Partial<ProductFormData> {}