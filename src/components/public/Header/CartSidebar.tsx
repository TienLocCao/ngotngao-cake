'use client';
import React, { useState } from 'react';
import {
  RiCloseLine,
  RiSubtractLine,
  RiAddLine,
  RiDeleteBinLine,
} from '@remixicon/react';
import { useCart } from '@/lib/context/CartContext';

interface CartSidebarProps {
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ onClose }) => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = 30000;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="divide-y divide-gray-200 h-[calc(100vh-410px)] min-h-[400px] overflow-auto">
            {cartItems.map((product) => (
              <div className="py-4 flex" key={`${product.id}-${product.sizeId}`}>
                <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Size: {product.sizeId}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-gray-900">
                      {(+product.price).toLocaleString('vi-VN')}
                    </span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            product.sizeId,
                            product.quantity - 1
                          )
                        }
                      >
                        <RiSubtractLine />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {product.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            product.sizeId,
                            product.quantity + 1
                          )
                        }
                      >
                        <RiAddLine />
                      </button>
                    </div>
                  </div>
                  <button
                    className="mt-2 text-xs text-primary hover:text-primary-dark flex items-center"
                    onClick={() => removeItem(product.id, product.sizeId)}
                  >
                    <RiDeleteBinLine className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mt-6 border-t border-gray-200 pt-6 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${tax.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toLocaleString('vi-VN')}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
                onClick={() => window.location.href = '/checkouts'}
              >
                Proceed to Checkout
              </button>
              <button
                className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 transition"
                onClick={() => window.location.href = '/cart'}
              >
                View Cart
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default CartSidebar;
