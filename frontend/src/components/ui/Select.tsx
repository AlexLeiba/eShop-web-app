import { IconChevronDown } from '@tabler/icons-react';

type SelectData = {
  value: string;
  title: string;
};
type Props = {
  value?: string;
  data: SelectData[];
  label?: string;
  handleSelect: (value: string) => void;
};
export function Select({ data, label, value, handleSelect }: Props) {
  return (
    <div className='relative'>
      {label && <p className='text-1xl font-bold'>{label}</p>}
      <select
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        className='cursor-pointer   h-10 text-black rounded-full py-2 px-8 focus:border-none focus:outline-none bg-gray-200 transition-all z-10 hover:shadow-md'
      >
        {data.map((item) => {
          return (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
      <IconChevronDown className='absolute top-3 right-3 w-4 h-4 text-gray-500 pointer-events-none' />
    </div>
  );
}
