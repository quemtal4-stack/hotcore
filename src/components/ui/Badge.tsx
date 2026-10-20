import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BadgeVariant = "promo" | "pendente" | "preparando" | "pronto" | "entregue" | "default";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    promo: "bg-hotcore-yellow text-hotcore-dark",
    pendente: "bg-yellow-100 text-yellow-700",
    preparando: "bg-blue-100 text-blue-700",
    pronto: "bg-green-100 text-green-700",
    entregue: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={twMerge(
        "text-xs font-semibold px-3 py-1 rounded-full inline-block",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
