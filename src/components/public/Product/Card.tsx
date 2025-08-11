'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/public/ui/Button';
import CakeSizeDialog from './CakeSizeDialog';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
// import { CartItem, getCartItems, addToCartLocal } from '@/lib/cart';

import { CartItem } from '@/lib/cart';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  badgeName?: string;
  sizes: { id: string; sizeLabel: string; price: any }[];
}

const ProductCard = ({ id, title, image, price, description, badgeName, sizes }: ProductCardProps) => {
 const { addToCart, refresh } = useCart();
  const { data: session } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]?.id || '');

  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      title,
      image,
      price,
      sizeId: selectedSize,
      quantity: 1,
    };

    addToCart(item); // 
    toast.success(`${title} (${selectedSize}) added to cart!`);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      refresh(); 
    }
  }, [session]);

  return (
    <>
      <div className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"  onClick={() => setDialogOpen(true)}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-64 object-cover" loading="lazy" />
          {badgeName && (
              <span
              className="text-sm bg-primary text-white px-2 py-1 rounded-full absolute top-2 right-2 uppercase"
            >{badgeName}</span>
            )}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            
          </div>
        <p className="text-gray-600 mb-4 text-sm">
          {description}
        </p>
          <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{(+price).toLocaleString('vi-VN')}</span>
        </div>
      </div>
      </div>

      {/* Modal - Dialog */}
      <CakeSizeDialog
        open={dialogOpen}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleAddToCart}
        CAKE_SIZES={sizes}
      />
    </>
  );
};

export default ProductCard;
