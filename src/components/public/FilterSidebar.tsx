// FilterSidebar.tsx component
import React from 'react';
import Checkbox from '@/components/public/ui/Checkbox';
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
const FilterSidebar = () => {
  return (
    <motion.aside
      className="w-full md:w-64 bg-white p-6 rounded-2xl shadow"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">All Cakes</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Birthday Cakes</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Wedding Cakes</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Custom Cakes</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Cupcakes</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="form-radio text-primary border-gray-300"
            />
            <span className="ml-2 text-gray-700">All Prices</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="form-radio text-primary border-gray-300"
            />
            <span className="ml-2 text-gray-700">Under $25</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="form-radio text-primary border-gray-300"
            />
            <span className="ml-2 text-gray-700">$25 - $50</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="form-radio text-primary border-gray-300"
            />
            <span className="ml-2 text-gray-700">$50 - $100</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="form-radio text-primary border-gray-300"
            />
            <span className="ml-2 text-gray-700">Over $100</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-medium mb-3">Dietary Options</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Gluten Free</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Vegan</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Sugar Free</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-primary rounded border-gray-300"
            />
            <span className="ml-2 text-gray-700">Nut Free</span>
          </label>
        </div>
      </div>
      <button
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-200 transition-all whitespace-nowrap"
      >
        Clear All Filters
      </button>
    </motion.aside>
  );
};

export default FilterSidebar;
