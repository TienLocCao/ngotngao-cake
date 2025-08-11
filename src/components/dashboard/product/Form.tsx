import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ProductStatus, ProductFormData, Product, ProductErrors, ProductStatusOptions } from '@/types/product';
import NumberInput from '@/components/dashboard/common/NumberInput';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => Promise<boolean>;
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    image: '',
    price: '',
    description: '',
    badgeName: 'Planning' as ProductStatus,
    sizes: []
  });
  const [errors, setErrors] = useState<ProductErrors>({
    name: '',
    image: '',
    price: '',
    description: '',
    sizes: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        badgeName: product.badgeName ?? 'New',
        sizes: product.sizes ?? []
      });
    } else {
      setFormData({
        name: '',
        image: '',
        price: '',
        description: '',
        badgeName: 'New' as ProductStatus,
        sizes: [],
      });
    }
    setErrors({ name: '', image: '', price: '', description: '', sizes: [] });
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {
      name: '',
      image: '',
      price: '',
      description: '',
      sizes: [] as { id: string; sizeLabel: string; price: string }[],
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    // Validate sizes
    newErrors.sizes = formData.sizes.map((size) => {
      const sizeErrors = { id: size.id, sizeLabel: '', price: '' };

      if (!size.sizeLabel.trim()) {
        sizeErrors.sizeLabel = 'Size label is required';
      }

      if (!size.price || isNaN(Number(size.price))) {
        sizeErrors.price = 'Valid price is required';
      }

      return sizeErrors;
    });

    setErrors(newErrors);

    // Check if any errors exist
    const hasMainErrors =
      newErrors.name || newErrors.image || newErrors.price || newErrors.description;

    const hasSizeErrors = newErrors.sizes.some(
      (err) => err.sizeLabel || err.price
    );

    return !hasMainErrors && !hasSizeErrors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-6" id="modal-title">
                  {product ? 'Edit Product' : 'Create New Product'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) validate();
                        }}
                        className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.name 
                            ? 'ring-red-300 focus:ring-red-500' 
                            : 'ring-gray-300 focus:ring-indigo-500'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors`}
                        placeholder="Enter product name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({ ...formData, description: e.target.value });
                          if (errors.description) validate();
                        }}
                        className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.description 
                            ? 'ring-red-300 focus:ring-red-500' 
                            : 'ring-gray-300 focus:ring-indigo-500'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors`}
                        placeholder="Enter product description"
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Product Image
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          if (errors.image) validate();
                        }}
                        className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.image 
                            ? 'ring-red-300 focus:ring-red-500' 
                            : 'ring-gray-300 focus:ring-indigo-500'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors`}
                        placeholder="Enter product image"
                      />
                      {errors.image && (
                        <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Product Price
                    </label>
                    <div className="mt-1">
                      <NumberInput
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={(rawValue: string) => {
                          setFormData({ ...formData, price: rawValue });
                          if (errors.price) validate();
                        }}
                        placeholder="Enter product price"
                        error={errors.price}
                      />
                      {errors.price && (
                        <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="badgeName" className="block text-sm font-medium text-gray-700">
                     Badge
                    </label>
                    <div className="mt-1">
                      <select
                        id="badgeName"
                        name="badgeName"
                        value={formData.badgeName}
                        onChange={(e) => setFormData({ ...formData, badgeName: e.target.value as ProductStatus })}
                        className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-colors"
                      >
                        {ProductStatusOptions.map((status) => (
                          <option key={status.key} value={status.label}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className=' border border-gray-200 p-4'>
                    {formData.sizes.map((size, index) => (
                      <div key={size.id} className="mb-2 flex gap-2">
                        <div className="w-1/2">
                          <input
                            type="text"
                            placeholder="Size Label"
                            value={size.sizeLabel}
                            onChange={(e) => {
                              const updatedSizes = [...formData.sizes];
                              updatedSizes[index].sizeLabel = e.target.value;
                              setFormData({ ...formData, sizes: updatedSizes });
                            }}
                            className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.sizes[index]?.sizeLabel
                                ? 'ring-red-300 focus:ring-red-500'
                                : 'ring-gray-300 focus:ring-indigo-500'
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                          {errors.sizes[index]?.sizeLabel && (
                            <p className="text-sm text-red-600 mt-1">{errors.sizes[index]?.sizeLabel}</p>
                          )}
                        </div>

                        <div className="w-1/2">
                          <input
                            type="number"
                            placeholder="Price"
                            value={size.price}
                            onChange={(e) => {
                              const updatedSizes = [...formData.sizes];
                              updatedSizes[index].price = e.target.value;
                              setFormData({ ...formData, sizes: updatedSizes });
                            }}
                            className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.sizes[index]?.price
                                ? 'ring-red-300 focus:ring-red-500'
                                : 'ring-gray-300 focus:ring-indigo-500'
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                          {errors.sizes[index]?.price && (
                            <p className="text-sm text-red-600 mt-1">{errors.sizes[index]?.price}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updatedSizes = formData.sizes.filter((_, i) => i !== index);
                            const updatedErrors = errors.sizes.filter((_, i) => i !== index);
                            setFormData({ ...formData, sizes: updatedSizes });
                            setErrors({ ...errors, sizes: updatedErrors });
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌
                        </button>
                      </div>
                    ))}


                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          sizes: [
                            ...formData.sizes,
                            { id: `${Date.now()}`, sizeLabel: '', price: '' },
                          ],
                        })
                      }
                    >
                      ➕ Add Size
                    </button>
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                        isSubmitting
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      } transition-colors`}
                    >
                      {isSubmitting ? 'Saving...' : product ? 'Save Changes' : 'Create Product'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;