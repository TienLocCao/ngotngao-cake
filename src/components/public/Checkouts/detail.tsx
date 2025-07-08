'use client';

import React, {useState} from 'react';
import ContactForm from './ContactForm';
import ShippingAddressForm from './ShippingAddressForm';
import PaymentMethodForm from './PaymentMethodForm';
import CreditCardForm from './CreditCardForm';
import OrderSummary from './OrderSummary';
import { useRouter } from 'next/navigation';
import {useCart} from '@/lib/context/CartContext'
import { toast } from 'react-toastify';

type PaymentMethod = 'cod' | 'bank' | 'momo';

const CheckoutsDetail = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');
  // State cho các form
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [shippingInfo, setShippingInfo] = useState({
    receiverName: '',
    lastName: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });

  const { cartItems, removeAllItem } = useCart(); // từ context
  const router = useRouter();

    const handleSubmitOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        cakeId: item.id,
        sizeId: item.sizeId,
        quantity: item.quantity,
        price: item.price,
      }));

      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const payload = {
        userId: 'current_user_id', // hoặc để BE lấy từ session
        totalPrice,
        paymentMethod: selectedMethod,
        status: 'pending',
        receiverName: shippingInfo.receiverName,
        phone: contactInfo.phone,
        address: shippingInfo.address,
        province: shippingInfo.province,
        district: shippingInfo.district,
        ward: shippingInfo.ward,
        cartItems,
      };
      console.log("payload", payload)
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Tạo đơn hàng thất bại');
      toast.success(`Tạo đơn hàng thành công!`);
      removeAllItem();
      // Thành công
      router.push('/shop');
    } catch (err) {
      toast.success(`Lỗi khi tạo đơn hàng:`);
      console.error('Lỗi khi tạo đơn hàng:', err);
    }
  };

  return (
    <section id="checkout-page" className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[90vw] mx-auto">
        {/* LEFT */}
        <div className="space-y-8">
          <ContactForm  contactInfo={contactInfo} setContactInfo={setContactInfo} />
          <ShippingAddressForm  shippingInfo={shippingInfo} setShippingInfo={setShippingInfo}/>
          <PaymentMethodForm selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
          {selectedMethod === 'bank' && <CreditCardForm />}
        </div>

        {/* RIGHT */}
        <OrderSummary handleSubmitOrder={handleSubmitOrder}/>
      </div>
    </section>
  );
};

export default CheckoutsDetail;
