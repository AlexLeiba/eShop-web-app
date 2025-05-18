import { IconShoppingCart, IconX } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { ProductsType } from '../../consts';
import { updateCart } from '../../store/cart/apiCalls';
import type { RootState } from '../../store/store';
import toast from 'react-hot-toast';
import { deleteFromWishlist } from '../../store/wishList/apiCalls';
import { useTranslation } from 'react-i18next';

type Props = {
  data: ProductsType;
  type: 'cart' | 'wishList';
};
export function WishListCard({ data, type }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'WishlistPage' });
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  async function handleRemove() {
    const response = await deleteFromWishlist({
      dispatch,
      productId: data._id,
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t('toast.productRemoved'));
    }
  }

  async function handleAddToCart(product: ProductsType) {
    const response = await updateCart({
      dispatch,
      product: {
        ...product,
        color: product.color[0],
        size: product.size[0],
        quantity: 1,
        categories: product.categories[0], // Use the first category as a string
        productId: product._id,
      },
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t('toast.productAddedToWishlist'));
    }
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
          <p className='text-xl font-bold line-clamp-1'>{data.title}</p>

          <p className='text-xl line-clamp-2 '>{data.description}</p>
        </div>

        <div className='flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            {type === 'wishList' && (
              <Button onClick={() => handleAddToCart(data)}>
                {t('addToCartButton')}
                <IconShoppingCart className='ml-2' />
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
