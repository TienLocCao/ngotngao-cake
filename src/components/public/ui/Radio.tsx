// Radio.tsx component
import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio: React.FC<RadioProps> = (props) => {
  return (
    <input
      type="radio"
      className="form-radio text-primary border-gray-300 focus:ring-primary"
      {...props}
    />
  );
};

export default Radio;
