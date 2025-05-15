import { IconShoppingCart, IconX } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { addToCart } from '../../store/cart/reducer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { ProductsType } from '../../consts';
import { removeFromWishList } from '../../store/wishList/reducer';

type Props = {
  data: ProductsType;
  type: 'cart' | 'wishList';
};
export function WishListCard({ data, type }: Props) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeFromWishList({ ...data }));
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        ...data,
        color: data.color[0],
        size: data.size[0],
        quantity: 1,
      })
    );
  }
  return (
    <div className='flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative'>
      <Link to={`/product/${data._id}`}>
        <div>
          <img
            className='h-[160px] w-[300px] object-contain'
            src={data.image}
            alt={data.title}
          />
        </div>
      </Link>

      <div className='flex flex-col justify-between w-full'>
        <div className='flex flex-col gap-2'>
          <p className='text-xl font-bold '>{data.title}</p>

          <p className='text-xl '>{data.description}</p>
        </div>

        <div className='flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            {type === 'wishList' && (
              <Button onClick={handleAddToCart}>
                Add to cart <IconShoppingCart className='ml-2' />
              </Button>
            )}
          </div>

          <div>
            <p className='text-3xl '>${data.price}</p>
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
