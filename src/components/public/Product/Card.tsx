// ProductCard.tsx component
'use client';
import React from 'react';
import Button from '@/components/public/ui/Button';

import { toast } from 'react-toastify';

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  description: string;
  badge?: string;
}

const ProductCard = ({ title, image, price, description, badge }: ProductCardProps) => {
  const handleAddToCart = (productName: string) => {
    console.log("soo")
    toast.success(`${productName} added to cart!`);
  };

  return (
    <div
      className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {badge && (
            <span
              className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full"
            >{badge}</span>
          )}
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{price}</span>
          <Button variant="primary" onClick={() => { handleAddToCart(title) }}>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
};

export default ProductCard;