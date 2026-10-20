import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white shadow-card",
    elevated: "bg-white shadow-hotcore",
    outline: "bg-white border border-gray-200",
  };

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={twMerge(
        "rounded-hotcore",
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
