'use client';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/lib/animations';
import React, { useEffect, useState } from 'react';
import ProductCard from './Card';
import ProductFilters from './Filters';
import ProductListHeader from './ListHeader';
import Pagination from '@/components/public/ui/Pagination';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  badge?: string;
}

const pageSize = 12;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString(),
        search: searchTerm,
        price: selectedPriceRange,
        sort: selectedSort,
      });

      selectedCategory.forEach((cat) => {
        if (cat !== 'all') query.append('category', cat);
      });

      selectedDiet.forEach((diet) => {
        query.append('diet', diet);
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
        badge: cake.badge || undefined,
      }));
      console.log(formattedProducts)
      setProducts(formattedProducts);
      setTotal(total);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setProducts([])
    } finally {
      setLoading(false);
    }
  };
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      fetchProducts();
    } else {
      fetchProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scroll lên đầu
    }
  }, [currentPage, searchTerm, selectedCategory, selectedDiet, selectedPriceRange, selectedSort]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div className="lg:w-1/4" variants={slideInFromLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDiet={selectedDiet}
              onDietChange={setSelectedDiet}
              selectedPrice={selectedPriceRange}
              onPriceChange={setSelectedPriceRange}
              onSearch={setSearchTerm}
            />
          </motion.div>
          <motion.div className="lg:w-3/4" variants={slideInFromRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ProductListHeader sortValue={selectedSort} onSortChange={setSelectedSort} resultCount={total} />

            {error && <p className="text-center text-red-500">{error}</p>}
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]"
            >
            {loading
              ? Array.from({ length: pageSize }).map((_, i) => (
                  <div key={i} className="h-[300px] bg-gray-100 animate-pulse rounded"></div>
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </motion.div>
            <Pagination
              total={total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
