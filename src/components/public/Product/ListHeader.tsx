'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiGridLine, RiListCheck2 } from '@remixicon/react';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'low-to-high' },
  { label: 'Price: High to Low', value: 'high-to-low' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Selling', value: 'best-selling' },
];

const ProductListHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const currentSort = searchParams.get('sort') || 'featured';

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sort by:</span>
        <select
          className="border border-gray-200 rounded-sm px-3 py-2 bg-white text-gray-700 pr-8"
          onChange={handleSortChange}
          value={currentSort}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">24 products</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
            <RiGridLine />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
            <RiListCheck2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListHeader;
