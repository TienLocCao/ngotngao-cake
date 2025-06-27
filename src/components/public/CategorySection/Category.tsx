'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import CategoryCard from './CategoryCard';

const sampleCategories = [
  {
    title: "Wedding Cakes",
    description: "Make your special day even more memorable",
    image:
      "https://readdy.ai/api/search-image?query=A%20beautiful%20wedding%20cake%20with%20white%20fondant%2C%20decorated%20with%20elegant%20sugar%20flowers%20and%20pearls%2C%20placed%20on%20a%20classic%20cake%20stand%20with%20a%20soft%2C%20romantic%20background.%20The%20cake%20features%20multiple%20tiers%20and%20intricate%20lace%20details&width=400&height=300&seq=2&orientation=landscape",
    href: "/shop?category=wedding",
  },
  {
    title: "Birthday Cakes",
    description: "Celebrate another year with sweetness",
    image:
      "https://readdy.ai/api/search-image?query=A%20colorful%20and%20fun%20birthday%20cake%20decorated%20with%20rainbow%20sprinkles%2C%20chocolate%20drips%2C%20and%20candy%20toppings.%20The%20cake%20features%20bright%20colors%20and%20festive%20decorations%2C%20perfect%20for%20a%20celebration&width=400&height=300&seq=3&orientation=landscape",
    href: "/shop?category=birthday",
  },
  {
    title: "Custom Cakes",
    description: "Design your dream cake with us",
    image:
      "https://readdy.ai/api/search-image?query=An%20elegant%20custom%20cake%20with%20unique%20design%20elements%2C%20artistic%20decorations%2C%20and%20premium%20finishing.%20The%20cake%20showcases%20creative%20patterns%2C%20metallic%20accents%2C%20and%20modern%20styling&width=400&height=300&seq=4&orientation=landscape",
    href: "/shop?category=custom",
  },
  {
    title: "Cupcakes",
    description: "Perfect little bites of happiness",
    image:
      "https://readdy.ai/api/search-image?query=A%20selection%20of%20small%2C%20beautifully%20decorated%20cupcakes%20with%20various%20flavors%20and%20toppings.%20The%20cupcakes%20feature%20colorful%20frostings%2C%20sprinkles%2C%20and%20delicate%20decorations&width=400&height=300&seq=5&orientation=landscape",
    href: "/shop?category=cupcakes",
  },
];

const CategoryHome = () => {
  return (
    <section
      id="categories"
      className="py-20 bg-white"
    >
      <motion.div className="container mx-auto px-4" variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-gray-600">
            Find the perfect cake for your special occasion
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleCategories.map((item, index) => (
            <CategoryCard key={index} {...item} />
          ))}
        </div>
      </motion.div>
    </section>
  )
};

export default CategoryHome;