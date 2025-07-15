import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "gradient" | "white";
  showText?: boolean;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  variant = "default",
  showText = false,
  textClassName,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const variantClasses = {
    default: "text-primary dark:text-white",
    gradient:
      "text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text",
    white: "text-white",
  };

  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn(
            sizeClasses[size],
            variantClasses[variant],
            "transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
            className
          )}
        >
          <path
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
            clipRule="evenodd"
          />
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold transition-colors duration-300",
            textSizeClasses[size],
            variantClasses[variant],
            "group-hover:text-blue-400",
            textClassName
          )}
        >
          Taskify
        </span>
      )}
    </div>
  );
};

export default Logo;
