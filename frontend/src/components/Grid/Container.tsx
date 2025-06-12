import React from 'react';
import { cn } from '../../lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
};
export function Container({
  children,
  className,
  fluid,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col',
        fluid ? 'w-full h-full' : 'w-full h-full max-w-5xl mx-auto px-4', //max width 1024px
        className
      )}
    >
      {children}
    </div>
  );
}
