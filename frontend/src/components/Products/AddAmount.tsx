import { IconMinus, IconPlus } from '@tabler/icons-react';
import { changeCartProductQuantity } from '../../store/cart/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import toast from 'react-hot-toast';
import { addQuantity, reduceQuantity } from '../../store/filters/reducer';

type Props = {
  type?: 'cartPage' | 'productPage';
  productId?: string;

  productData?: {
    color: string;
    size: string;
    quantity: number;
  };
};
function AddAmount({ type, productId, productData }: Props) {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionToken = userData?.token || '';

  async function handleAmount(changeType: 'minus' | 'plus') {
    if (type === 'cartPage' && productId) {
      const response = await changeCartProductQuantity({
        dispatch,
        productId: productId,
        quantity:
          changeType === 'minus'
            ? productData?.quantity && productData?.quantity > 1
              ? -1
              : 0
            : 1,
        token: sessionToken,
        size: productData?.size || '',
        color: productData?.color || '',
      });

      if (response?.error) {
        return toast.error(response.error);
      }
    }
    if (type === 'productPage') {
      if (changeType === 'minus') {
        dispatch(reduceQuantity());
      }
      if (changeType === 'plus') {
        dispatch(addQuantity(1));
      }
    }
  }
  return (
    <div className='flex gap-2 items-center'>
      <IconMinus
        className='hover:bg-gray-400 rounded-full hover:text-white transition-all cursor-pointer'
        onClick={() => handleAmount('minus')}
      />
      <p className='text-md font-bold border border-gray-300 rounded-full px-3 py-1 text-center shadow-md '>
        {productData?.quantity}
      </p>
      <IconPlus
        className='hover:bg-gray-400 rounded-full hover:text-white transition-all cursor-pointer'
        onClick={() => handleAmount('plus')}
      />
    </div>
  );
}

export default AddAmount;
