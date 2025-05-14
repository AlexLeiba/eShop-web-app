import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'w-full font-bold rounded-full py-2 px-4 text-md hover:opacity-80 cursor-pointer hover:shadow-gray-500 shadow flex items-center justify-center ',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white',
        secondary: 'bg-white text-black',
      },
      size: {
        large: 'text-2xl h-14 ',
        medium: 'text-lg h-10',
        small: 'text-sm h-8',
      },
    },
  }
);

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  type = 'button',
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
