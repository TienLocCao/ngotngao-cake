import React from 'react';
import Layout from '@/components/public/Layout';
import Values from '@/components/public/Values';
import Team from '@/components/public/Team';
import VisitBakery from '@/components/public/VisitBakery';
const About = () => {
  return (
    <Layout>
      {/* About Hero Section */}
      <section className="bg-gradient-to-b from-secondary/10 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Story</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Crafting delicious moments and sweet memories since 2010
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=A%20warm%20and%20inviting%20artisanal%20bakery%20interior%20with%20vintage%20charm%2C%20showing%20bakers%20working%20on%20custom%20cakes.%20Natural%20light%20streams%20through%20large%20windows%2C%20illuminating%20the%20workspace%20filled%20with%20professional%20equipment%20and%20fresh%20ingredients&width=600&height=800&seq=30&orientation=portrait"
                alt="Our Bakery"
                className="w-full h-[600px] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">A Sweet Beginning</h2>
              <p className="text-gray-600 mb-6">
                Our journey began in a small kitchen with a big dream. What
                started as a passion for creating unique, delicious cakes has
                grown into a beloved destination for cake lovers across the
                city.
              </p>
              <p className="text-gray-600 mb-6">
                We take pride in using only the finest ingredients, combining
                traditional baking methods with innovative techniques to create
                cakes that are both visually stunning and incredibly delicious.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <StatItem value="15+" label="Years of Experience" />
                <StatItem value="50k+" label="Happy Customers" />
                <StatItem value="200+" label="Cake Designs" />
                <StatItem value="100%" label="Satisfaction" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Values */}
      <Values />
      {/* Meet Our Team */}
      <Team />
      {/* Visit Our Bakery */}
      <VisitBakery />
    </Layout>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default About;
