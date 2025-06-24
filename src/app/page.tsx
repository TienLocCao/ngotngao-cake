import React from 'react';
import Layout from '@/components/public/Layout';
import Hero from '@/components/public/Hero';
import Category from '@/components/public/Category';
import BestSeller from '@/components/public/BestSeller';
import WhyChooseUs from '@/components/public/WhyChooseUs';


const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
      <BestSeller />
      <WhyChooseUs />
    </Layout>
  );
};

export default Home;
