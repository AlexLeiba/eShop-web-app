import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { type SetStateAction } from 'react';

type Props = {
  setAmount: React.Dispatch<SetStateAction<number>>;
  amount: number;
};
function AddAmount({ setAmount, amount }: Props) {
  function handleAmount(type: 'minus' | 'plus') {
    if (type === 'minus') {
      setAmount((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    }
    if (type === 'plus') {
      setAmount((prev) => prev + 1);
    }
  }
  return (
    <div className='flex gap-2 items-center'>
      <IconMinus
        className='hover:bg-gray-400 rounded-full hover:text-white transition-all cursor-pointer'
        onClick={() => handleAmount('minus')}
      />
      <p className='text-md font-bold border rounded-md px-4 py-1 text-center'>
        {amount}
      </p>
      <IconPlus
        className='hover:bg-gray-400 rounded-full hover:text-white transition-all cursor-pointer'
        onClick={() => handleAmount('plus')}
      />
    </div>
  );
}

export default AddAmount;
