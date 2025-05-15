import React, { useEffect } from 'react';
import { IconShoppingCart, IconX } from '@tabler/icons-react';
import AddAmount from '../Products/AddAmount';
import { Button } from '../ui/Button';
import { removeFromCart, type CartItemsType } from '../../store/cart/reducer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SelectedColor from '../Cart/SelectedColor';

type Props = {
  cartData: CartItemsType;
  type: 'cart' | 'wishList';
};
export function CartCard({ cartData, type }: Props) {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState({
    quantity: cartData.quantity,
    color: '',
    size: '',
  });

  useEffect(() => {
    setAmount({
      quantity: cartData.quantity,
      color: cartData.color,
      size: cartData.size,
    });
  }, [cartData]);

  function handleRemove() {
    dispatch(removeFromCart({ ...cartData, quantity: amount.quantity }));
  }
  return (
    <div className='flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative'>
      <Link to={`/product/${cartData._id}`}>
        <div>
          <img
            className='h-[160px] w-[300px] object-contain'
            src={cartData.image}
            alt={cartData.title}
          />
        </div>
      </Link>

      <div className='flex flex-col justify-between w-full'>
        <p className='text-xl '>
          <b className='text-semibold'>Product:</b> {cartData.title}
        </p>
        <p className='text-xl '>
          <b className='text-semibold'>ID:</b> {cartData._id}
        </p>
        <p className='text-xl '>
          <b className='text-semibold'>Size:</b> {cartData.size}
        </p>
        <SelectedColor color={cartData.color} />
        <div className='flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            <AddAmount setAmount={setAmount} amount={amount.quantity} />
            {type === 'wishList' && (
              <Button>
                Add to cart <IconShoppingCart className='ml-2' />
              </Button>
            )}
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
