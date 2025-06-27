'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/animations';
import ProductCard from './Product/Card';

const bestSellers = [
  {
    title: "Chocolate Dream",
    image:
      "https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=6&orientation=squarish",
    price: "$49.99",
    description: "Rich chocolate layers with ganache",
    badge: "",
  },
  {
    title: "Red Velvet",
    image:
      "https://readdy.ai/api/search-image?query=A%20red%20velvet%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20red%20velvet%20crumbs%20and%20white%20chocolate%20pieces.%20The%20cake%20has%20a%20striking%20red%20color%20and%20elegant%20presentation&width=400&height=400&seq=7&orientation=squarish",
    price: "$44.99",
    description: "Classic red velvet with cream cheese",
    badge: "",
  },
  {
    title: "Strawberry Delight",
    image:
      "https://readdy.ai/api/search-image?query=A%20vanilla%20strawberry%20cake%20with%20fresh%20strawberries%20and%20light%20cream%20frosting.%20The%20cake%20features%20layers%20of%20fresh%20fruit%20and%20a%20light%2C%20airy%20texture&width=400&height=400&seq=8&orientation=squarish",
    price: "$39.99",
    description: "Fresh strawberries and cream",
  },
  {
    title: "Tiramisu Cake",
    image:
      "https://readdy.ai/api/search-image?query=A%20tiramisu%20cake%20with%20coffee-soaked%20layers%20and%20mascarpone%20cream%2C%20dusted%20with%20cocoa%20powder.%20The%20cake%20has%20visible%20layers%20and%20an%20elegant%2C%20sophisticated%20appearance&width=400&height=400&seq=9&orientation=squarish",
    price: "$54.99",
    description: "Italian classic with coffee twist",
  },
];

const BestSeller = () => {
  return (
    <section
      id="shop"
      className="py-20 bg-gray-50"

    >
      <motion.div className="container mx-auto px-4" variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Best Sellers</h2>
          <p className="text-gray-600">Most loved cakes by our customers</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={fadeIn}>
          {bestSellers.map((cake, index) => (
            <ProductCard key={index} {...cake} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default BestSeller;