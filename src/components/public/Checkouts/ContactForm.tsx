import React from 'react';
import Input from '@/components/public/ui/Input';

const ContactForm = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">Contact Information</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <Input type="tel" id="tel" name="tel" required />
      </div>
    </form>
  </div>
);

export default ContactForm;
