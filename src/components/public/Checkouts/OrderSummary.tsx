'use client';
import React from 'react';
import { useCart } from '@/lib/context/CartContext';

type Props = {
  handleSubmitOrder: () => Promise<void>,
}

const OrderSummary = ({handleSubmitOrder}: Props) => {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm space-y-6 py-6">
      <h2 className="text-lg font-semibold text-gray-800  px-6">Order Summary</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto px-6">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.sizeId}`} className="flex items-center">
            <img src={item.image} className="w-16 h-16 rounded object-cover" />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-sm px-6">
        <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toLocaleString('vi-VN')} ₫</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping.toLocaleString('vi-VN')} ₫</span></div>
        <div className="flex justify-between"><span>Tax</span><span>{tax.toLocaleString('vi-VN')} ₫</span></div>
        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span><span>{total.toLocaleString('vi-VN')} ₫</span>
        </div>
      </div>
      <div className="px-6">
        <button className="w-full py-3 bg-primary text-white rounded hover:bg-primary/90 transition" onClick={handleSubmitOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
