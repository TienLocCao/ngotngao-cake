'use client';

import React from 'react';

interface Props {
  selectedCategory: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedDiet: string[];
  onDietChange: (diets: string[]) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  onSearch: (term: string) => void;
}

const categories = ['Birthday', 'Wedding', 'Custom', 'Cupcakes'];
// const diets = ['gluten', 'vegan', 'sugarfree', 'nutfree'];
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

      {/* Dietary */}
      {/* <div className="mb-6">
        <h4 className="font-medium mb-3">Dietary Options</h4>
        <div className="space-y-2">
          {diets.map((diet) => (
            <label key={diet} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary rounded border-gray-300"
                checked={selectedDiet.includes(diet)}
                onChange={(e) =>
                  handleCheckboxChange(
                    selectedDiet,
                    diet,
                    onDietChange,
                    e.target.checked
                  )
                }
              />
              <span className="ml-2 text-gray-700 capitalize">{diet}</span>
            </label>
          ))}
        </div>
      </div> */}

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
