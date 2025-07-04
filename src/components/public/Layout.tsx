'use client';
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { CartProvider } from '@/lib/context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <CartProvider>
      <Header />
      <main className={`${pathname != '/' ? 'pt-20' : ''}`}>{children}</main>
      <Footer />
    </CartProvider>
  );
};

export default Layout;
