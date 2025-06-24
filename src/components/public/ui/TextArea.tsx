// TextArea.tsx component
import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};

export default TextArea;
