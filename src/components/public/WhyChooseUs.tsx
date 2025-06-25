// WhyChooseUs.tsx component
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import React from 'react';
import { RiHeartFill, RiLeafLine, RiTruckLine, RiCustomerServiceLine } from '@remixicon/react'

const features = [
  {
    icon: RiHeartFill,
    title: "Made with Love",
    description: "Every cake is baked with passion and care",
  },
  {
    icon: RiLeafLine,
    title: "Fresh Ingredients",
    description: "We use only the finest quality ingredients",
  },
  {
    icon: RiTruckLine,
    title: "Fast Delivery",
    description: "Same day delivery available",
  },
  {
    icon: RiCustomerServiceLine,
    title: "Custom Orders",
    description: "Personalized cakes for your events",
  },
];

const WhyChooseUs = () => {
  return (
    // <!-- Why Choose Us Section -->
    <motion.section
      className="py-20 bg-white"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600">What makes our cakes special</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {
            features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div className="text-center" key={index}>
                  <div
                    className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      className="text-2xl text-primary" // add custom class name
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })
          }


        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
