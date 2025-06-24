// Select.tsx component
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = ({ className = "", children, ...props }) => {
  return (
    <select
      className={`w-full px-4 py-3 rounded-sm border border-gray-300 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
