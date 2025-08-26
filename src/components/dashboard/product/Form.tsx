// ~/components/dashboard/product/ProductForm.tsx
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NumberInput from "@/components/dashboard/common/NumberInput";
import SizeList from "./SizeList";
import { productSchema, ProductFormData, ProductErrors } from "@/schemas/product";
// import { ProductStatusOptions } from '@/types/product';
import { UploadAPI } from "@/lib/api";


interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => Promise<{ success: boolean }>;
  product?: ProductFormData;
  categories?: any[];
  badges?: any[];
}

const emptyErrors: ProductErrors = {
  name: "",
  image: "",
  price: "",
  description: "",
  categoryId: "",
  sizes: [],
};

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
  badges
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    image: "",
    price: null,
    description: "",
    badgeId: 1,
    categoryId: "",
    sizes: [],
  });
  const [errors, setErrors] = useState<ProductErrors>(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        image: "",
        price: null,
        description: "",
        badgeId: 1,
        categoryId: "",
        sizes: [],
      });
    }
    setErrors(emptyErrors);
  }, [product, isOpen]);

  const validate = () => {
    const result = productSchema.safeParse(formData);
    const newErrors: ProductErrors = {
      name: "",
      image: "",
      price: "",
      description: "",
      categoryId: "",
      sizes: formData.sizes.map((s) => ({
        id: s.id,
        sizeLabel: "",
        price: "",
      })),
    };

    // Nếu fail zod schema
    if (!result.success) {
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (path.startsWith("sizes")) {
          const [_, indexStr, field] = path.split(".");
          const index = Number(indexStr);
          (newErrors.sizes[index] as any)[field] = err.message;
        } else {
          (newErrors as any)[path] = err.message;
        }
      });
    }

    // Check trùng sizeLabel
    const seen = new Set<string>();
    formData.sizes.forEach((s, idx) => {
      const label = s.sizeLabel?.trim().toLowerCase() || "";
      const price = s.price ?? "";

      if (!label || price === "") return;

      if (seen.has(label)) {
        newErrors.sizes[idx].sizeLabel = "Size name is duplicated";
      }
      seen.add(label);
    });

    // Nếu có bất kỳ lỗi nào
    const hasError =
      !!newErrors.name ||
      !!newErrors.image ||
      !!newErrors.price ||
      !!newErrors.description ||
      newErrors.sizes.some((s: any) => s.sizeLabel || s.price);

    setErrors(newErrors);
    return !hasError;
  };

  const handleFileChange = (file: File) => {
    // Preview ảnh tạm (local URL)
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = formData.image;
      if (selectedFile) {
        const res = await UploadAPI.create(selectedFile);
        imageUrl = res.data.url || res.data.data?.url; // tùy backend trả về
      }
      const res = await onSubmit({
      ...formData,
      image: imageUrl, // lưu URL thật vào DB
    });
      if (res.success) onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-black/75"></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <h3 className="text-2xl font-semibold mb-6">
              {product ? "Edit Product" : "Create Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.name
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-500"
                  }  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.description
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-500"
                  }  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Image */}
              {/* <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  value={formData.image ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.image
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-500"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                )}
              </div> */}
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(file);
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md border"
                    />
                  </div>
                )}
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                )}
              </div>
              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <NumberInput
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={(val) => setFormData({ ...formData, price: val })}
                  placeholder="Enter product price"
                  error={errors.price}
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-medium">Badge</label>
                <select
                  value={formData.badgeId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      badgeId: Number(e.target.value) as ProductFormData["badgeId"],
                    })
                  }
                  className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-colors"
                >
                  {(badges|| []).map((status, index) => (
                    <option key={`${status.id}-${index}`} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId: e.target.value as ProductFormData["categoryId"],
                    })
                  }
                  className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.categoryId
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-500"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                >
                  <option value="">No category</option>
                  {(categories|| []).map((category, index) => (
                    <option key={`${category.id}-${index}`} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-2 text-sm text-red-600">{errors.categoryId}</p>
                )}
              </div>

              {/* Sizes */}
              <SizeList
                sizes={formData.sizes}
                errors={errors.sizes}
                onChange={(sizes) => setFormData({ ...formData, sizes })}
              />

              {/* Actions */}
              <div className="mt-5 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-3 py-2 text-sm font-semibold text-white rounded-md ${
                    isSubmitting
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {isSubmitting
                    ? "Saving..."
                    : product
                    ? "Save Changes"
                    : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mx-3 mt-3 sm:mt-0 px-3 py-2 text-sm rounded-md bg-white ring-1 ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
