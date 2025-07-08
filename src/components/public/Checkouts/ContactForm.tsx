import React from 'react';
import Input from '@/components/public/ui/Input';

type ContactInfo = {
  email: string;
  phone: string;
};

type Props = {
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
};

const ContactForm = ({ contactInfo, setContactInfo }: Props) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">Contact Information</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <Input type="email" id="email" name="email" required value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <Input type="tel" id="tel" name="tel" required value={contactInfo.phone}
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} />
      </div>
    </form>
  </div>
);

export default ContactForm;
