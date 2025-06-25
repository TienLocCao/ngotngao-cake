// ProductList.tsx component
'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/lib/animations';
import React from 'react';
import ProductCard from './Card';
import FilterSidebar from '../FilterSidebar';
import Pagination from '@/components/public/ui/Pagination';
import {
  RiGridLine,
  RiListCheck2,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from '@remixicon/react';

export const sampleProducts = [
  {
    title: "Chocolate Dream",
    image:
      "https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=13&orientation=squarish",
    price: "$49.99",
    description: "Rich chocolate layers with ganache",
    badge: "Best Seller",
  },
  {
    title: "Red Velvet",
    image:
      "https://readdy.ai/api/search-image?query=A%20red%20velvet%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20red%20velvet%20crumbs%20and%20white%20chocolate%20pieces.%20The%20cake%20has%20a%20striking%20red%20color%20and%20elegant%20presentation&width=400&height=400&seq=14&orientation=squarish",
    price: "$44.99",
    description: "Classic red velvet with cream cheese",
    badge: "New",
  },
  {
    title: "Strawberry Delight",
    image:
      "https://readdy.ai/api/search-image?query=A%20vanilla%20strawberry%20cake%20with%20fresh%20strawberries%20and%20light%20cream%20frosting.%20The%20cake%20features%20layers%20of%20fresh%20fruit%20and%20a%20light%2C%20airy%20texture&width=400&height=400&seq=15&orientation=squarish",
    price: "$39.99",
    description: "Fresh strawberries and cream",
  },
  {
    title: "Tiramisu Cake",
    image:
      "https://readdy.ai/api/search-image?query=A%20tiramisu%20cake%20with%20coffee-soaked%20layers%20and%20mascarpone%20cream%2C%20dusted%20with%20cocoa%20powder.%20The%20cake%20has%20visible%20layers%20and%20an%20elegant%2C%20sophisticated%20appearance&width=400&height=400&seq=16&orientation=squarish",
    price: "$54.99",
    description: "Italian classic with coffee twist",
  },
  {
    title: "Lemon Blueberry",
    image:
      "https://readdy.ai/api/search-image?query=A%20lemon%20blueberry%20cake%20with%20light%20lemon%20buttercream%20frosting%20and%20fresh%20blueberries.%20The%20cake%20has%20a%20bright%2C%20fresh%20appearance%20with%20natural%20decorations&width=400&height=400&seq=17&orientation=squarish",
    price: "$42.99",
    description: "Zesty lemon with fresh blueberries",
    badge: "New",
  },
  {
    title: "Carrot Cake",
    image:
      "https://readdy.ai/api/search-image?query=A%20carrot%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20chopped%20nuts%20and%20caramel%20drizzle.%20The%20cake%20has%20a%20rustic%2C%20homemade%20appearance%20with%20elegant%20finishing&width=400&height=400&seq=18&orientation=squarish",
    price: "$38.99",
    description: "Classic carrot with cream cheese",
  },
];


const ProductList = () => (
  <section
    className="py-12"
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div className="lg:w-1/4" variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
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
          </div>
        </motion.div>
        <motion.div className="lg:w-3/4" variants={slideInFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <div
            className="flex flex-wrap gap-4 items-center justify-between mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                className="border border-gray-200 rounded-sm px-3 py-2 bg-white text-gray-700 pr-8"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Selling</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">24 products</span>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <RiGridLine />
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <RiListCheck2 />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=13&orientation=squarish"
                alt="Chocolate Dream"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Chocolate Dream</h3>
                  <span
                    className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >Best Seller</span
                  >
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Rich chocolate layers with ganache
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$49.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20red%20velvet%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20red%20velvet%20crumbs%20and%20white%20chocolate%20pieces.%20The%20cake%20has%20a%20striking%20red%20color%20and%20elegant%20presentation&width=400&height=400&seq=14&orientation=squarish"
                alt="Red Velvet"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Red Velvet</h3>
                  <span
                    className="text-sm bg-secondary/10 text-gray-700 px-2 py-1 rounded-full"
                  >New</span
                  >
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Classic red velvet with cream cheese
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$44.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20vanilla%20strawberry%20cake%20with%20fresh%20strawberries%20and%20light%20cream%20frosting.%20The%20cake%20features%20layers%20of%20fresh%20fruit%20and%20a%20light%2C%20airy%20texture&width=400&height=400&seq=15&orientation=squarish"
                alt="Strawberry Delight"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Strawberry Delight</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Fresh strawberries and cream
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$39.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20tiramisu%20cake%20with%20coffee-soaked%20layers%20and%20mascarpone%20cream%2C%20dusted%20with%20cocoa%20powder.%20The%20cake%20has%20visible%20layers%20and%20an%20elegant%2C%20sophisticated%20appearance&width=400&height=400&seq=16&orientation=squarish"
                alt="Tiramisu Cake"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Tiramisu Cake</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Italian classic with coffee twist
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$54.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20lemon%20blueberry%20cake%20with%20light%20lemon%20buttercream%20frosting%20and%20fresh%20blueberries.%20The%20cake%20has%20a%20bright%2C%20fresh%20appearance%20with%20natural%20decorations&width=400&height=400&seq=17&orientation=squarish"
                alt="Lemon Blueberry"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Lemon Blueberry</h3>
                  <span
                    className="text-sm bg-secondary/10 text-gray-700 px-2 py-1 rounded-full"
                  >New</span
                  >
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Zesty lemon with fresh blueberries
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$42.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div
              className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src="https://readdy.ai/api/search-image?query=A%20carrot%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20chopped%20nuts%20and%20caramel%20drizzle.%20The%20cake%20has%20a%20rustic%2C%20homemade%20appearance%20with%20elegant%20finishing&width=400&height=400&seq=18&orientation=squarish"
                alt="Carrot Cake"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Carrot Cake</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Classic carrot with cream cheese
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$38.99</span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div> */}
            {sampleProducts.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <RiArrowLeftSLine />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white"
              >
                1
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                2
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                3
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <RiArrowRightSLine />
              </button>
            </nav>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProductList;
