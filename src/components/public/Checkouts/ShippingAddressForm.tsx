import React from 'react';
import Input from '@/components/public/ui/Input';

const ShippingAddressForm = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">Shipping Address</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input required placeholder="First Name" className="input" />
        <Input required placeholder="Last Name" className="input" />
      </div>
      <Input required placeholder="Address" className="input" />
      <Input placeholder="Apartment, suite, etc." className="input" />
      <div className="grid grid-cols-2 gap-4">
        <Input required placeholder="City" className="input" />
        <Input required placeholder="Postal Code" className="input" />
      </div>
    </form>
  </div>
);

export default ShippingAddressForm;
