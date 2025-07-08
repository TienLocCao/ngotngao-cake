// app/cart/page.tsx
'use client';
import React from 'react';
import Layout from '@/components/public/Layout';
import CheckoutsDetail from '@/components/public/Checkouts/detail';

const ViewCartPage = () => {

  return (
    <Layout>
       <CheckoutsDetail />
    </Layout>
  );
};

export default ViewCartPage;
