'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import {
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiTruckLine,
  RiArrowGoBackLine,
  RiQuestionLine,
  RiCustomerService2Line,
  RiSearchLine,
  RiStore2Line,
  RiRestaurantLine,
  RiCake2Line,
  RiAwardLine,
  RiGiftLine,
  RiFacebookFill,
  RiInstagramLine,
  RiPinterestLine,
  RiTwitterXLine,
  RiVisaLine,
  RiMastercardLine,
  RiPaypalLine,
  RiAppleFill,
  RiGoogleFill,
} from '@remixicon/react';

const Footer = () => (
  <motion.footer
    className="bg-white pt-16 pb-8 border-t border-gray-100"
    >
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-6">
            <a href="#" className="font-['Pacifico'] text-3xl text-primary">CTL</a>
          </div>
          <p className="text-gray-600 mb-6">
            Crafting gourmet food-inspired cakes since 2010. From savory to sweet, we create unique culinary cake experiences that surprise and delight.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <RiMapPinLine className="text-primary mt-1" />
              <p className="text-gray-600 ml-3">District, HCM</p>
            </div>
            <div className="flex items-center">
              <RiPhoneLine className="text-primary" />
              <p className="text-gray-600 ml-3">(84) 77-35-449-37</p>
            </div>
            <div className="flex items-center">
              <RiMailLine className="text-primary" />
              <p className="text-gray-600 ml-3">caotienloc0310@gmail.com</p>
            </div>
          </div>
        </div>

        <FooterList title="Customer Service" items={[
          { icon: RiTruckLine, label: "Shipping Information" },
          { icon: RiArrowGoBackLine, label: "Return Policy" },
          { icon: RiQuestionLine, label: "FAQ" },
          { icon: RiCustomerService2Line, label: "Contact Us" },
          { icon: RiSearchLine, label: "Order Tracking" },
        ]} />

        <FooterList title="Quick Links" items={[
          { icon: RiStore2Line, label: "All Food Cakes" },
          { icon: RiRestaurantLine, label: "Savory Cakes" },
          { icon: RiCake2Line, label: "Custom Food Cakes" },
          { icon: RiAwardLine, label: "Signature Collection" },
          { icon: RiGiftLine, label: "Corporate Orders" },
        ]} />

        <div>
          <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter for exclusive food cake creations, culinary inspiration, and special event announcements.
          </p>
          <div className="mb-4">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input px-4 py-3 border border-gray-200 rounded-l-button w-full text-sm focus:ring-primary"
              />
              <button className="bg-primary text-white px-5 py-3 rounded-r-button whitespace-nowrap hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-6 md:mb-0">
            © 2025 Food Cake Artistry. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-gray-600">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Cookies</a>
          </div>
          <div className="flex space-x-4">
            {[RiFacebookFill, RiInstagramLine, RiPinterestLine, RiTwitterXLine].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[RiVisaLine, RiMastercardLine, RiPaypalLine, RiAppleFill, RiGoogleFill].map((Icon, i) => (
            <div key={i} className="w-12 h-8 flex items-center justify-center text-gray-500">
              <Icon size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.footer>
);

const FooterList = ({
  title,
  items,
}: {
  title: string;
  items: { icon: React.ElementType; label: string }[];
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-6">{title}</h3>
    <ul className="space-y-3 text-sm">
      {items.map(({ icon: Icon, label }, index) => (
        <li key={index}>
          <a href="#" className="text-gray-600 hover:text-primary flex items-center">
            <Icon className="mr-2 text-xs" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
