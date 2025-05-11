import React from 'react';
import { Button } from '../ui/Button';
import { Spacer } from '../ui/spacer';

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  shippingDiscount: number;
};
export function OrderSummary({
  total,
  subtotal,
  shipping,
  shippingDiscount,
}: Props) {
  return (
    <div className=' rounded-md p-4 shadow h-[300px] sticky top-12 bg-white flex justify-between flex-col'>
      <h3 className='text-2xl font-bold'>Order Summary</h3>
      <div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>
            <b>Subtotal:</b>
          </p>
          <p className='text-xl'>${subtotal}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>Shipping:</p>
          <p className='text-xl'>${shipping}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>Shipping Discount:</p>
          <p className='text-xl'>${shippingDiscount}</p>
        </div>

        <div className='flex gap-2 items-center'>
          <p className='text-xl'>
            <b>Total:</b>
          </p>
          <p className='text-xl'>${total}</p>
        </div>
      </div>
      <Spacer size={8} />
      <Button className='w-[250px]'>Place Order</Button>
    </div>
  );
}
