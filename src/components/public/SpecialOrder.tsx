// SpecialOrder.tsx component
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import React from 'react';
import Button from '@/components/public/ui/Button';

const SpecialOrder = () => (
  <motion.section
    className="py-16 bg-secondary/10"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}>
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Need Something Special?</h2>
        <p className="mb-6">Custom cakes for any occasion – weddings, birthdays, or unique themes.</p>
        <Button variant="primary">Make a Custom Order</Button>
      </div>
    </div>
  </motion.section>
);

export default SpecialOrder;