'use client';
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <main className={`${pathname != '/' ? 'pt-20' : ''}`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
