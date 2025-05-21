import React from 'react';
import './Button.scss';

type Props = {
  children?: React.ReactNode;
  widthSize?: number;
};
export function Button({
  children,
  widthSize,
  ...props
}: Props & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{ width: widthSize || '100%' }}
      className='button'
    >
      {children}
    </button>
  );
}
