'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  RiSearchLine,
  RiShoppingCartLine,
  RiUserLine,
  RiMenuLine,
} from '@remixicon/react';
import SearchOverlay from './Header/SearchOverlay';
import CartSidebar from './Header/CartSidebar';
import UserDropdown from './Header/UserDropdown';
import MobileMenu from './Header/MobileMenu';

const navLinks = ['Home', 'Shop', 'About', 'Contact'];

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSearch && searchRef.current && !searchRef.current.contains(event.target as Node)
      ) setShowSearch(false);
      if (
        showCart && cartRef.current && !cartRef.current.contains(event.target as Node)
      ) setShowCart(false);
      if (
        showUser && userRef.current && !userRef.current.contains(event.target as Node)
      ) setShowUser(false);
      if (
        showMobile && mobileRef.current && !mobileRef.current.contains(event.target as Node)
      ) setShowMobile(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch, showCart, showUser, showMobile]);

  useEffect(() => {
    const isAnyOpen = showCart || showMobile;
    if (isAnyOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showCart, showMobile]);

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="font-['Pacifico'] font-bold text-3xl text-primary">
            CTL
          </a>

          <div className="hidden md:flex space-x-8">
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
          </div>

          <div className="flex items-center space-x-6">
            {/* Icons on desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(true)}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary relative"
              >
                <RiSearchLine className="text-xl" />
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary relative"
              >
                <RiShoppingCartLine className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={() => setShowUser((prev) => { return !prev})}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary"
              >
                <RiUserLine className="text-xl" />
                {showUser && <div ref={userRef}><UserDropdown onClose={() => setShowUser(false)} /></div>}
              </button>
            </div>

            {/* Mobile menu icon */}
            <button
              onClick={() => setShowMobile(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
            >
              <RiMenuLine className="text-2xl" />
            </button>
          </div>
        </nav>
      </motion.header>

      {showSearch && <div ref={searchRef}><SearchOverlay onClose={() => setShowSearch(false)} /></div>}
      {showCart && <div ref={cartRef}><CartSidebar onClose={() => setShowCart(false)} /></div>}
      
      {showMobile && <div ref={mobileRef}  className="md:hidden"><MobileMenu navLinks={navLinks} onClose={() => setShowMobile(false)} /></div>}
    </>
  );
};

export default Header;
