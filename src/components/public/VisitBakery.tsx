// VisitBakery.tsx
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import React from 'react';
import {
  RiMapPinLine,
  RiTimeLine,
  RiPhoneLine,
} from '@remixicon/react';

const VisitBakery = () => (
  <motion.section
    className="py-16 bg-gray-50"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Visit Our Bakery</h2>
          <p className="text-gray-600 mb-8">
            Come visit our bakery where the magic happens. Watch our team at
            work and experience the sweet aroma of freshly baked cakes.
          </p>

          <div className="space-y-4">
            <VisitInfo
              icon={<RiMapPinLine className="text-primary" size={20} />}
              title="Location"
            >
              District, HCM
            </VisitInfo>

            <VisitInfo
              icon={<RiTimeLine className="text-primary" size={20} />}
              title="Hours"
            >
              <>
                <p className="text-gray-600">Mon-Sat: 8:00 AM - 7:00 PM</p>
                <p className="text-gray-600">Sunday: 9:00 AM - 5:00 PM</p>
              </>
            </VisitInfo>

            <VisitInfo
              icon={<RiPhoneLine className="text-primary" size={20} />}
              title="Contact"
            >
              <>
                <p className="text-gray-600">Phone: (84) 77-35-449-37</p>
                <p className="text-gray-600">Email: caotienloc0310@gmail.com</p>
              </>
            </VisitInfo>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://readdy.ai/api/search-image?query=A%20beautiful%20bakery%20storefront%20with%20large%20display%20windows%20showcasing%20elegant%20cakes%2C%20warm%20lighting%2C%20and%20inviting%20entrance.%20The%20exterior%20has%20a%20modern%20yet%20charming%20design%20with%20the%20bakery%20name%20displayed%20prominently&width=600&height=400&seq=35&orientation=landscape"
            alt="Our Bakery Store"
            className="w-full rounded-2xl shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </motion.section>
);

const VisitInfo = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start">
    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      {typeof children === 'string' ? (
        <p className="text-gray-600">{children}</p>
      ) : (
        children
      )}
    </div>
  </div>
);

export default VisitBakery;
