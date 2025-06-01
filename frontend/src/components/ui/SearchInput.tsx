import { IconSearch, IconX } from '@tabler/icons-react';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
};
export function SearchInput({
  label,
  placeholder,
  value,
  onChange,
  error = '',
  type = 'text',
}: Props) {
  return (
    <div className='min-w-[150px] relative h-8'>
      <IconSearch className='absolute top-2 left-2 text-black' size={18} />
      {value !== '' && (
        <IconX
          onClick={() => onChange('')}
          className='absolute top-2 right-2 text-black cursor-pointer '
          size={18}
        />
      )}
      {label && <label htmlFor={type}>{label}</label>}
      <input
        className='hover:shadow bg-white focus:text-white focus:placeholder:text-white text-black rounded-full w-full pl-8 pr-8 h-full focus:border-none focus:outline-none focus:bg-gray-400 transition-all'
        type={type}
        placeholder={placeholder || 'Search'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
