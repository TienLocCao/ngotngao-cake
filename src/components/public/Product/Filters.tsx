'use client';

import React, {useState, useEffect} from 'react';
import { CategoryAPI } from "@/lib/api";

interface Props {
  selectedCategory: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedDiet: string[];
  onDietChange: (diets: string[]) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  onSearch: (term: string) => void;
}

const prices = ['all', 'under25', '25-50', '50-100', 'over100'];

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedDiet,
  onDietChange,
  selectedPrice,
  onPriceChange,
  onSearch,
}: Props) => {

  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const handleCheckboxChange = (
    currentValues: string[],
    value: string,
    onChange: (values: string[]) => void,
    isChecked: boolean
  ) => {
    const updated = isChecked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onChange(updated);
  };

  const fetchCategories = async () => {
    setLoadingCategory(true);
    try {
      const query = new URLSearchParams({
        page: 'all',
      });

      const response = await CategoryAPI.getList(query as any);
      if (!response.status) throw new Error('Failed to fetch categories');

      const { items } = await response.data;
      const formattedCategories = items.map((category: any) => category.name);

      setCategories(formattedCategories);
    } catch {
      setCategories([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    if (!categories.length) {
      console.log("Fetching categories as none are loaded yet", categories.length);
      fetchCategories();
    }
  }, [categories]);

  

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cakes..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary rounded border-gray-300"
                checked={selectedCategory.includes(cat)}
                onChange={(e) =>
                  handleCheckboxChange(
                    selectedCategory,
                    cat,
                    onCategoryChange,
                    e.target.checked
                  )
                }
              />
              <span className="ml-2 text-gray-700 capitalize">
                {cat.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </span>
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
                checked={selectedPrice === price}
                onChange={() => onPriceChange(price)}
              />
              <span className="ml-2 text-gray-700 capitalize">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          onCategoryChange([]);
          onDietChange([]);
          onPriceChange('all');
          onSearch('');
        }}
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-200 transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;
