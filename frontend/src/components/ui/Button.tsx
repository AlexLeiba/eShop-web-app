import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "w-full disabled:pointer-events-none transition-all font-bold rounded-full py-2 px-4 text-md cursor-pointer  shadow flex items-center justify-center disabled:text-white disabled:hover:shadow-none disabled:shadow-none disabled:hover:opacity-100",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-white dark:disabled:text-gray-500 disabled:bg-gray-600  hover:opacity-80 hover:shadow-gray-400",
        secondary:
          "bg-white text-black dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-800 dark:disabled:text-gray-600 disabled:bg-gray-300 disabled:text-white  hover:opacity-80 hover:shadow-gray-400",
        ghost:
          "bg-white text-black dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800 dark:disabled:text-gray-600 disabled:bg-gray-300 disabled:text-white  hover:opacity-80 hover:shadow-gray-400",
        link: "bg-transparent text-black dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800 dark:disabled:text-gray-600 disabled:bg-gray-300 disabled:text-white py-0 px-2 text-sm transition-all",
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
  variant?: "primary" | "secondary" | "ghost" | "link";
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
