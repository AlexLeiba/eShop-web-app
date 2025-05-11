import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'w-full font-bold rounded-full py-2 px-4 text-md hover:opacity-80 cursor-pointer hover:shadow-gray-500 shadow flex items-center justify-center ',
  {
    variants: {
      type: {
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
  type?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  className?: string;
};
export function Button({
  children,
  type = 'primary',
  size = 'medium',
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ type, size }), className)}
    >
      {children}
    </button>
  );
}
