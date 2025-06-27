'use client';
// Hero.tsx component
import React from 'react';
import Button from '@/components/public/ui/Button';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const Hero = () => (
  <motion.section
    className="relative bg-gradient-to-r from-white to-secondary/10 overflow-hidden min-h-[calc(100vh - 72px)]"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    >
    <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Delicious Cakes for Every Special Moment
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Handcrafted with love, our cakes are made with premium ingredients to make your celebrations unforgettable.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button>Shop Now</Button>
          <Button variant="outline">Custom Order</Button>
        </div>
      </div>
      <div className="md:w-1/2 relative my-2">
        <img
          src="https://readdy.ai/api/search-image?query=A%20stunning%20and%20elegant%20wedding%20cake%20with%20multiple%20tiers%20decorated%20with%20white%20fondant%20and%20delicate%20sugar%20flowers%2C%20placed%20on%20a%20luxurious%20dessert%20table%20with%20a%20soft%2C%20blurred%20pastel%20background.%20The%20cake%20features%20intricate%20piping%20details%20and%20a%20romantic%2C%20classic%20design&width=600&height=600&seq=1&orientation=squarish"
          alt="Delicious Cake"
          className="w-full object-cover rounded-3xl shadow-2xl"
          loading="lazy"
        />
      </div>
    </div>
  </motion.section>
);

export default Hero;