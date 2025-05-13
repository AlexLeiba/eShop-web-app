import { IconSend } from '@tabler/icons-react';
import React from 'react';
import { cn } from '../../lib/utils';

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend?: () => void;
};
export function Input({
  label,
  placeholder,
  value,
  error = '',
  type = 'text',
  onChange,
  handleSend,
  ...props
}: Props & React.HTMLAttributes<HTMLInputElement>) {
  return (
    <div className='w-full relative'>
      {label && <label htmlFor={type}>{label}</label>}
      <input
        {...props}
        className={cn(
          handleSend ? 'pr-10' : 'pr-4',
          'shadow focus-within:shadow-2xl  w-full bg-white focus:text-white focus:placeholder:text-white text-black rounded-full py-2 pl-4  focus:border-none focus:outline-none focus:bg-gray-400 transition-all'
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {handleSend && (
        <IconSend
          onClick={handleSend}
          className='size-6 text-black hover:text-gray-500 cursor-pointer absolute right-4 top-2'
        />
      )}
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
