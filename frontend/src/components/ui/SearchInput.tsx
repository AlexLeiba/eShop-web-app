import { IconSearch, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/search/reducer';
import type { RootState } from '../../store/store';

type Props = {
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
};
export function SearchInput({
  label,
  placeholder,
  error = '',
  type = 'text',
}: Props) {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchTerm
  );
  // TODO: add dispatch on onChange | delete onChange props and value
  return (
    <div className='min-w-[150px] relative h-8'>
      <IconSearch className='absolute top-2 left-2 text-black' size={18} />
      {searchValue !== '' && (
        <IconX
          onClick={() => dispatch(setSearchTerm(''))}
          className='absolute top-2 right-2 text-black cursor-pointer '
          size={18}
        />
      )}
      {label && <label htmlFor={type}>{label}</label>}
      <input
        className='hover:shadow bg-white focus:text-white focus:placeholder:text-white text-black rounded-full w-full pl-8 pr-8 h-full focus:border-none focus:outline-none focus:bg-gray-400 transition-all'
        type={type}
        placeholder={placeholder || 'Search'}
        value={searchValue}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
