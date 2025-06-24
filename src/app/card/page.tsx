'use client';
import React from 'react';
import Layout from '@/components/public/Layout';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
const About = () => {
  return (
    <Layout>
      <motion.section
        id="cart-page"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="divide-y divide-gray-200">
              <div className="py-6 flex items-center">
                <div
                  className="w-24 h-24 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20minimalist%20white%20sneaker%20with%20subtle%20design%20details%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=1&orientation=squarish"
                    alt="White Sneakers"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        Premium White Sneakers
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: 42 | Color: White
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">$129.00</p>
                      <p className="text-sm text-gray-500 mt-1">$129.00 each</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div
                      className="flex items-center border border-gray-300 rounded"
                    >
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <span className="w-12 text-center text-sm">1</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <button
                      className="text-sm text-primary hover:text-primary-dark flex items-center !rounded-button"
                    >
                      <i className="ri-delete-bin-line mr-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-6 flex items-center">
                <div
                  className="w-24 h-24 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20stylish%20leather%20crossbody%20bag%20in%20cognac%20brown%20color%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=2&orientation=squarish"
                    alt="Leather Bag"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        Leather Crossbody Bag
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Color: Cognac</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">$89.50</p>
                      <p className="text-sm text-gray-500 mt-1">$89.50 each</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div
                      className="flex items-center border border-gray-300 rounded"
                    >
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <span className="w-12 text-center text-sm">1</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <button
                      className="text-sm text-primary hover:text-primary-dark flex items-center !rounded-button"
                    >
                      <i className="ri-delete-bin-line mr-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-6 flex items-center">
                <div
                  className="w-24 h-24 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20minimalist%20gold%20watch%20with%20a%20leather%20strap%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=3&orientation=squarish"
                    alt="Gold Watch"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        Minimalist Gold Watch
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Strap: Brown Leather
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">$159.00</p>
                      <p className="text-sm text-gray-500 mt-1">$159.00 each</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div
                      className="flex items-center border border-gray-300 rounded"
                    >
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <span className="w-12 text-center text-sm">1</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 !rounded-button"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <button
                      className="text-sm text-primary hover:text-primary-dark flex items-center !rounded-button"
                    >
                      <i className="ri-delete-bin-line mr-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">$377.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">$12.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800 font-medium">$37.75</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900"
                    >Total</span
                    >
                    <span className="text-base font-semibold text-gray-900"
                    >$428.24</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <button
              id="cart-checkout-button"
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition !rounded-button whitespace-nowrap"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default About;
