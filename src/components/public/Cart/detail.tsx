// app/cart/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import {
  RiAddLine,
  RiSubtractLine,
  RiDeleteBinLine,
} from '@remixicon/react';

const CartDetail = () => {
  const { cartItems, updateQuantity, removeItem, refresh } = useCart();

  useEffect(() => {
    refresh(); // Refresh khi vào page
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 30000;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <section id="cart-page" className="container mx-auto">
      <div className="container mx-auto px-4">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-white rounded-lg shadow-sm p-6 col-span-1 lg:col-span-2 h-[calc(100vh-280px)] min-h-[500px] overflow-auto">
            <div className="divide-y divide-gray-200 ">
              {cartItems.length === 0 && (
                <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
              )}
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.sizeId}`} className="py-6 flex items-center">
                  <div className="w-24 h-24 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: {item.sizeId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{(+item.price).toLocaleString('vi-VN')}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            updateQuantity(item.id, item.sizeId, item.quantity - 1)
                          }
                        >
                          <RiSubtractLine />
                        </button>
                        <span className="w-12 text-center text-sm">{item.quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            updateQuantity(item.id, item.sizeId, item.quantity + 1)
                          }
                        >
                          <RiAddLine />
                        </button>
                      </div>
                      <button
                        className="text-sm text-primary hover:text-primary-dark flex items-center"
                        onClick={() => removeItem(item.id, item.sizeId)}
                      >
                        <RiDeleteBinLine className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <SummaryRow label="Subtotal" value={subtotal.toLocaleString('vi-VN')} />
                <SummaryRow label="Shipping" value={shipping.toLocaleString('vi-VN')} />
                <SummaryRow label="Tax" value={tax.toLocaleString('vi-VN')} />
                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-base font-semibold text-gray-900">
                    {total.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>
            </div>
            <button
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
              onClick={() => window.location.href = '/checkouts'}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800 font-medium">{value} ₫</span>
  </div>
);

export default CartDetail;
