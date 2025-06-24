import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className, children, ...props }) => {
  const base = "px-4 py-2 rounded-md font-medium whitespace-nowrap transition-all";
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-700 hover:text-primary",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
