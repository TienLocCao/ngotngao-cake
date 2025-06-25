import React from "react";

type Props = {
  title: string;
  description: string;
  image: string;
  href: string;
};

const CategoryCard = ({ title, description, image, href }: Props) => (
  <div className="category-card bg-white rounded-2xl shadow-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy"/>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href={href} className="text-primary font-medium hover:underline">
        View Collection →
      </a>
    </div>
  </div>
);

export default CategoryCard;
