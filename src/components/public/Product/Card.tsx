'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/public/ui/Button';
import CakeSizeDialog from './CakeSizeDialog';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { CartItem, getCartItems, addToCartLocal } from '@/lib/card';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
  badge?: string;
}

const ProductCard = ({ id, title, image, price, description, badge }: ProductCardProps) => {
 
  const { data: session } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('medium');

  const handleAddToCart = () => {
    toast.success(`${title} (${selectedSize}) added to cart!`);
    setDialogOpen(false);
    const item = {
      id, title, image, price, description, badge,
      sizeId: selectedSize,
      quantity: 1,
    }

    if (session?.user?.id) {
      addToCartDB(item);
    } else {
      addToCartLocal(item);
    }
  };

   const addToCartDB = async (item: CartItem) => {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    }

  useEffect(() => {
    if (session?.user?.id) {
       const localCart = getCartItems();
      if (localCart.length > 0) {
        localCart.forEach(async (item: CartItem) => {
          await addToCartDB(item);
        });
        localStorage.removeItem('cart'); 
      }
    }
  }, [session]);

  return (
    <>
      <div className="cake-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"  onClick={() => setDialogOpen(true)}>
        <img src={image} alt={title} className="w-full h-64 object-cover" loading="lazy" />
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
        CAKE_SIZES={[
          { value: 'small', label: 'Small (6 inches)' },
          { value: 'medium', label: 'Medium (8 inches)' },
          { value: 'large', label: 'Large (10 inches)' },
        ]}
      />
    </>
  );
};

export default ProductCard;
