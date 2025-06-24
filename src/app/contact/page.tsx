'use client';
import Layout from '@/components/public/Layout';
import React, { useState } from 'react';
import Input from '@/components/public/ui/Input';
import Select from '@/components/public/ui/Select';
import TextArea from '@/components/public/ui/TextArea';
import Button from '@/components/public/ui/Button';
import {
  RiMapPinLine,
  RiTimeLine,
  RiPhoneLine,
  RiMailLine,
  RiFacebookFill,
  RiInstagramLine,
  RiPinterestLine,
  RiTwitterXLine,
} from '@remixicon/react';

const Contact = () => {
  const [charCount, setCharCount] = useState(0);
  const socialIcons = [
  { icon: RiFacebookFill, href: '#' },
  { icon: RiInstagramLine, href: '#' },
  { icon: RiPinterestLine, href: '#' },
  { icon: RiTwitterXLine, href: '#' },
];
  return (
    <Layout>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our cakes or need to place a custom order?
              We're here to help! Fill out the form below and we'll get back to
              you as soon as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <form method="POST" id="contactForm" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input type="text" id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" id="phone" name="phone" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Select id="subject" name="subject">
                    <option value="">Select a subject</option>
                    <option value="order">Custom Order</option>
                    <option value="wedding">Wedding Consultation</option>
                    <option value="corporate">Corporate Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <TextArea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={500}
                    required
                    onChange={(e) => setCharCount(e.target.value.length)}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {charCount}/500 characters
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-6">Visit Our Store</h3>
                <div className="space-y-4">
                  <ContactInfo icon={<RiTimeLine className="text-xl text-primary" />} title="Address">
                    District<br />HCM
                  </ContactInfo>
                  <ContactInfo icon={<RiTimeLine className="text-xl text-primary" />} title="Opening Hours">
                    Monday - Saturday: 8:00 AM - 7:00 PM<br />Sunday: 9:00 AM - 5:00 PM
                  </ContactInfo>
                  <ContactInfo icon={<RiPhoneLine className="text-xl text-primary" />} title="Phone">
                    (84) 77-35-449-37
                  </ContactInfo>
                  <ContactInfo icon={<RiMailLine className="text-xl text-primary" />} title="Email">
                    caotienloc0310@gmail.com
                  </ContactInfo>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-6">Find Us</h3>
                <div className="w-full h-64 rounded-xl overflow-hidden">
                  <img
                    src="https://public.readdy.ai/gen_page/map_placeholder_1280x720.png"
                    alt="Store Location"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialIcons.map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ContactInfo = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start">
    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
      {icon}
    </div>
    <div className="ml-4">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

export default Contact;
