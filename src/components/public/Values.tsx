// Values.tsx component
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import React from 'react';

const values = [
  {
    icon: "ri-heart-line",
    title: "Passion for Quality",
    description: "We pour our hearts into every cake, using only premium ingredients and maintaining the highest standards."
  },
  {
    icon: "ri-shield-star-line",
    title: "Customer First",
    description: "Your satisfaction is our priority. We work closely with you to create the perfect cake."
  },
  {
    icon: "ri-creativity-line",
    title: "Creative Innovation",
    description: "We explore new designs and flavors to bring you memorable cake experiences."
  }
];

const Values = () => (
  <motion.section
    className="py-16 bg-gray-50"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((val, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className={`${val.icon} text-2xl text-primary`} />
            </div>
            <h3 className="text-xl font-semibold mb-4">{val.title}</h3>
            <p className="text-gray-600">{val.description}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Values;