'use client';

import React from 'react';
import { RiCloseLine, RiSearchLine, RiUserLine, RiShoppingBagLine, RiHeartLine, RiShoppingCartLine } from '@remixicon/react';
import { usePathname } from 'next/navigation';
type Props = {
    navLinks: string[];
    onClose: () => void
}
const MobileMenu = ({ navLinks, onClose }: Props) => {
  const pathname = usePathname();
  return (
    <div className="mobile-menu fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <a href="#" className="font-['Pacifico'] text-2xl text-primary">
            logo
          </a>
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-700 rounded-button"
            onClick={onClose}
          >
            <RiCloseLine className="text-2xl" />
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <RiSearchLine className="text-gray-400 text-xl" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 text-gray-700 bg-gray-100 rounded border-none focus:ring-2 focus:ring-primary focus:outline-none text-base"
            placeholder="Search for products..."
          />
        </div>

        <ul className="space-y-1 mb-6">
          {navLinks.map((item, index) => {
              const href = item !== 'Home' ? `/${item.toLowerCase()}` : '/';
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <a
                  key={index}
                  href={href}
                  className={`nav-link text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-primary ${isActive ? 'font-semibold text-primary' : ''}`}
                >
                  {item}
                </a>
              );
            })}
        </ul>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Account</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-8 h-8 flex items-center justify-center text-gray-500 mr-3">
                  <RiUserLine />
                </div>
                <span>My Account</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-8 h-8 flex items-center justify-center text-gray-500 mr-3">
                  <RiShoppingBagLine />
                </div>
                <span>My Orders</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-8 h-8 flex items-center justify-center text-gray-500 mr-3">
                  <RiHeartLine />
                </div>
                <span>Wishlist</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-8 h-8 flex items-center justify-center text-gray-500 mr-3">
                  <RiShoppingCartLine />
                </div>
                <span>Cart (3)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <button className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition rounded-button whitespace-nowrap">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
