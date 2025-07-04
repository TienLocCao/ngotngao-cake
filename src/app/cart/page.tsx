// app/cart/page.tsx
'use client';
import React, { useEffect } from 'react';
import Layout from '@/components/public/Layout';
import CartDetail from '@/components/public/Cart/detail';

const ViewCartPage = () => {

  return (
    <Layout>
      <section className="bg-gradient-to-b from-secondary/10 to-white pt-16 pb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Shopping Cart</h1>
        </div>
      </section>
       <CartDetail />
    </Layout>
  );
};

export default ViewCartPage;
