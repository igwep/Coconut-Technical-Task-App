import React from "react";
import { cn } from "@/app/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-md font-medium transition",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-blue-600 text-blue-600 hover:bg-blue-50",
        variant === "ghost" && "text-blue-600 hover:underline",
        disabled && "opacity-50 cursor-not-allowed", // ← add this
        className
      )}
      {...props}
    />
  );
};

export default Button;
