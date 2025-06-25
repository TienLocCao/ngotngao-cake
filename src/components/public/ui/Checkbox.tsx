// Checkbox.tsx component
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <input
      type="checkbox"
      className="form-checkbox text-primary rounded border-gray-300 focus:ring-primary"
      {...props}
    />
  );
};

export default Checkbox;
