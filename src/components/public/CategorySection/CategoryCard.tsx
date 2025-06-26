import React from "react";
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  description: string;
  image: string;
  href: string;
};

const CategoryCard = ({ title, description, image, href }: Props) => {
  const router = useRouter();
   const handleClick = () => {
    router.push(href, { scroll: true });
  };
  return (
    <div className="category-card bg-white rounded-2xl shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a className="text-primary font-medium hover:underline" onClick={handleClick}>
          View Collection →
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
