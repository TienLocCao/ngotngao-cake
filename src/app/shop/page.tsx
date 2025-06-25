import React from 'react';
import Layout from '@/components/public/Layout';
import ProductList from '@/components/public/Product/List';
import SpecialOrder from '@/components/public/SpecialOrder';

const About = () => {
  return (
    <Layout>
      <SpecialOrder />
      <ProductList />
    </Layout>
  );
};


export default About;
