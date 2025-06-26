'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/lib/animations';
import React from 'react';
import ProductCard from './Card';
import ProductFilters from './Filters';
import ProductListHeader from './ListHeader';
import Pagination from '@/components/public/ui/Pagination';

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
          <ProductFilters />
        </motion.div>
        <motion.div className="lg:w-3/4" variants={slideInFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <ProductListHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
          <Pagination />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProductList;
