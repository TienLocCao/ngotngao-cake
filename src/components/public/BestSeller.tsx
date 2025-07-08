'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/animations';
import ProductCard from './Product/Card';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  badgeName?: string;
  sizes: { id: string; sizeLabel: string; price: any }[];
}


const BestSeller = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        limit: '4',
        sort: 'best-selling'
      });

      const response = await fetch(`/api/cakes?${query}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const { items, total } = await response.json();

      const formattedProducts = items.map((cake: any): Product => ({
        id: cake.id,
        title: cake.title,
        image: cake.imageUrl,
        price: cake.price,
        description: cake.description,
        badgeName: undefined,
        sizes: cake.sizes
      }));
      console.log(formattedProducts)
      setProducts(formattedProducts);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setProducts([])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

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
          {products.map((cake, index) => (
            <ProductCard key={index} {...cake} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default BestSeller;