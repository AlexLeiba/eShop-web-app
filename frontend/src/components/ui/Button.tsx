import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "w-full disabled:pointer-events-none transition-all font-bold rounded-full py-2 px-4 text-md hover:opacity-80 cursor-pointer hover:shadow-gray-400 shadow flex items-center justify-center disabled:bg-gray-300 disabled:text-white disabled:hover:shadow-none disabled:shadow-none disabled:hover:opacity-100",
  {
    variants: {
      variant: {
        primary: "bg-black text-white dark:disabled:text-gray-500",
        secondary: "bg-white text-black dark:bg-gray-800 dark:text-white ",
      },
      size: {
        large: "text-2xl h-14 ",
        medium: "text-lg h-10",
        small: "text-sm h-8",
      },
    },
  }
);

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
/**
 * Button component with different variants and sizes.
 *
 * @param {React.ReactNode} children - The content of the button.
 * @param {('primary' | 'secondary')} [variant='primary'] - The variant of the button.
 * @param {('large' | 'medium' | 'small')} [size='medium'] - The size of the button.
 * @param {string} [className] - Additional class name for the button.
 * @param {('button' | 'submit' | 'reset')} [type='button'] - The type attribute of the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 * @param {React.HTMLAttributes<HTMLButtonElement>} props - Additional HTML attributes for the button.
 * @return {JSX.Element} The rendered button component.
 */
export function Button({
  children,
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  disabled = false,
  ...props
}: Props & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      type={type}
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
