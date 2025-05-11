import React from 'react';
import type { ProductType } from '../../pages/Product';
import { IconX } from '@tabler/icons-react';
import AddAmount from '../Products/AddAmount';
import SelectedColor from './SelectedColor';

export function CartCard(cartData: ProductType) {
  const [amount, setAmount] = React.useState(cartData.stock);

  function handleRemove() {
    return {};
  }
  return (
    <div className='flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative'>
      <img className='h-[160px]' src={cartData.image} alt={cartData.title} />
      <div className='flex flex-col justify-between w-full'>
        <p className='text-xl '>
          <b className='text-semibold'>Product:</b> {cartData.title}
        </p>
        <p className='text-xl '>
          <b className='text-semibold'>ID:</b> {cartData.id}
        </p>
        <p className='text-xl '>
          <b className='text-semibold'>Size:</b> {cartData.size}
        </p>
        <SelectedColor color='green' />
        <div className='flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            <AddAmount setAmount={setAmount} amount={amount} />
          </div>

          <div>
            <p className='text-3xl '>${cartData.price}</p>
          </div>
        </div>
      </div>
      <IconX
        onClick={handleRemove}
        className='absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-500'
      />
    </div>
  );
}
