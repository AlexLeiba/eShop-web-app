import React from 'react';
import { cn } from '../../lib/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type Props = {
  direction: 'prev' | 'next';
  title: string;
};
function SlideButton({
  direction,
  ...props
}: Props & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        direction === 'prev' ? 'left-2 top-1/2' : 'right-2 top-1/2',
        'z-10 absolute size-10 rounded-full  bg-gray-800/50 text-white flex justify-center items-center hover:bg-gray-600 cursor-pointer transition-all'
      )}
    >
      {direction === 'prev' ? <IconChevronLeft /> : <IconChevronRight />}
    </button>
  );
}

export default SlideButton;
