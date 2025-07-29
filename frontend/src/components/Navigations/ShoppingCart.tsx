import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type Props = {
  quantity: number;
};
export function ShoppingCart({ quantity }: Props) {
  return (
    <Link to={'/cart'} title='Shopping Cart'>
      <div className='hover:text-white relative rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-500 transition-all cursor-pointer'>
        {quantity > 0 && (
          <div className='absolute top-0 right-0 w-4 h-4 rounded-full bg-red-600 flex justify-center items-center'>
            <p className='text-xs font-bold text-white'>{quantity}</p>
          </div>
        )}
        <IconShoppingCart />
      </div>
    </Link>
  );
}
