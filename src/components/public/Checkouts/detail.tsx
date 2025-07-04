'use client';

import React, {useState} from 'react';
import ContactForm from './ContactForm';
import ShippingAddressForm from './ShippingAddressForm';
import PaymentMethodForm from './PaymentMethodForm';
import CreditCardForm from './CreditCardForm';
import OrderSummary from './OrderSummary';

type PaymentMethod = 'cod' | 'bank' | 'momo';

const CheckoutsDetail = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');
  return (
    <section id="checkout-page" className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[90vw] mx-auto">
        {/* LEFT */}
        <div className="space-y-8">
          <ContactForm />
          <ShippingAddressForm />
          <PaymentMethodForm selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
          {selectedMethod === 'bank' && <CreditCardForm />}
        </div>

        {/* RIGHT */}
        <OrderSummary />
      </div>
    </section>
  );
};

export default CheckoutsDetail;
