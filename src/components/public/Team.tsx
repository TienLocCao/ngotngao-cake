// Team.tsx component
'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import React from 'react';

const team = [
  {
    name: "David Chen",
    role: "Lead Cake Designer",
    avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20male%20cake%20decorator%20in%20his%2030s%20wearing%20a%20white%20chef%20coat%2C%20artistic%20and%20creative%20expression%2C%20neutral%20background&width=300&height=300&seq=32&orientation=squarish"
  },
  {
    name: "Sophie Martinez",
    role: "Pastry Artist",
    avatar: ""
  },
  {
    name: "",
    role: "",
    avatar: ""
  }
];

const Team = () => (
  <motion.section
    className="py-16"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20female%20master%20pastry%20chef%20in%20her%2040s%20wearing%20a%20white%20chef%20coat%2C%20confident%20and%20experienced%20expression%2C%20neutral%20background&width=300&height=300&seq=31&orientation=squarish"
            alt="Emily Richardson"
            className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold mb-2">Emily Richardson</h3>
          <p className="text-primary mb-2">Master Pastry Chef</p>
          <p className="text-gray-600">
            15 years of experience in creating extraordinary wedding and
            celebration cakes.
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20male%20cake%20decorator%20in%20his%2030s%20wearing%20a%20white%20chef%20coat%2C%20artistic%20and%20creative%20expression%2C%20neutral%20background&width=300&height=300&seq=32&orientation=squarish"
            alt="David Chen"
            className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold mb-2">David Chen</h3>
          <p className="text-primary mb-2">Lead Cake Designer</p>
          <p className="text-gray-600">
            Specializes in custom designs and innovative cake decorating
            techniques.
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20female%20baker%20in%20her%2020s%20wearing%20a%20white%20chef%20coat%2C%20friendly%20and%20enthusiastic%20expression%2C%20neutral%20background&width=300&height=300&seq=33&orientation=squarish"
            alt="Sophie Martinez"
            className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold mb-2">Sophie Martinez</h3>
          <p className="text-primary mb-2">Pastry Artist</p>
          <p className="text-gray-600">
            Expert in creating delicate sugar flowers and intricate cake
            details.
          </p>
        </div>
        <div className="text-center">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20male%20pastry%20chef%20in%20his%2030s%20wearing%20a%20white%20chef%20coat%2C%20passionate%20and%20dedicated%20expression%2C%20neutral%20background&width=300&height=300&seq=34&orientation=squarish"
            alt="James Wilson"
            className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold mb-2">James Wilson</h3>
          <p className="text-primary mb-2">Flavor Specialist</p>
          <p className="text-gray-600">
            Creates unique flavor combinations and ensures perfect taste in
            every cake.
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default Team;