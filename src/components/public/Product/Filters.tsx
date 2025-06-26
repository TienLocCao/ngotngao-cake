'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleParam = useCallback((key: string, value: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isChecked) {
      params.append(key, value);
    } else {
      const updated = Array.from(params.getAll(key)).filter((v) => v !== value);
      params.delete(key);
      updated.forEach((v) => params.append(key, v));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const isChecked = (key: string, value: string) => {
    return searchParams.getAll(key).includes(value);
  };

  const categories = ['all', 'birthday', 'wedding', 'custom', 'cupcakes'];
  const diets = ['gluten', 'vegan', 'sugarfree', 'nutfree'];
  const prices = ['all', 'under25', '25-50', '50-100', 'over100'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary rounded border-gray-300"
                checked={isChecked('category', cat)}
                onChange={(e) => toggleParam('category', cat, e.target.checked)}
              />
              <span className="ml-2 text-gray-700 capitalize">{cat.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {prices.map((price) => (
            <label key={price} className="flex items-center">
              <input
                type="radio"
                name="price"
                className="form-radio text-primary border-gray-300"
                checked={searchParams.get('price') === price}
                onChange={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('price', price);
                  router.push(`?${params.toString()}`, { scroll: false });
                }}
              />
              <span className="ml-2 text-gray-700 capitalize">{price.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Dietary Options</h4>
        <div className="space-y-2">
          {diets.map((diet) => (
            <label key={diet} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary rounded border-gray-300"
                checked={isChecked('diet', diet)}
                onChange={(e) => toggleParam('diet', diet, e.target.checked)}
              />
              <span className="ml-2 text-gray-700 capitalize">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push('?', { scroll: false })}
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-200 transition-all whitespace-nowrap"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;
