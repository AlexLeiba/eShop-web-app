import { IconShoppingCart, IconX } from '@tabler/icons-react';
import AddAmount from '../Products/AddAmount';
import { Button } from '../ui/Button';
import { type CartItemsType } from '../../store/cart/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SelectedColor from '../Cart/SelectedColor';
import { deleteFromCart } from '../../store/cart/apiCalls';
import type { RootState } from '../../store/store';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

type Props = {
  productData: CartItemsType;
  type: 'cart' | 'wishList';
};
export function CartCard({ productData, type }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'CartPage' });
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  async function handleRemove() {
    const response = await deleteFromCart({
      dispatch,
      token: sessionToken,
      productId: productData._id,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success('Product was removed from cart');
    }
  }
  return (
    <div className='flex gap-8  shadow rounded-md py-4 pl-4 pr-8 relative'>
      <Link to={`/product/${productData._id}`}>
        <div>
          <img
            className='h-[160px] w-[300px] object-contain'
            src={productData.image}
            alt={productData.title}
          />
        </div>
      </Link>

      <div className='flex flex-col justify-between w-full'>
        <p className='text-xl line-clamp-1'>
          <b className='text-semibold'> {t('product')}:</b> {productData.title}
        </p>
        <p className='text-xl line-clamp-1'>
          <b className='text-semibold'>ID:</b> {productData._id}
        </p>
        <p className='text-xl '>
          <b className='text-semibold'>{t('size')}:</b>{' '}
          {productData.size.toUpperCase()}
        </p>
        <SelectedColor color={productData.color} />
        <div className='flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            <AddAmount
              quantity={productData.quantity}
              productId={productData._id}
              type='cartPage'
            />
            {type === 'wishList' && (
              <Button>
                Add to cart <IconShoppingCart className='ml-2' />
              </Button>
            )}
          </div>

          <div>
            <p className='text-3xl line-clamp-1'>${productData.price}</p>
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
