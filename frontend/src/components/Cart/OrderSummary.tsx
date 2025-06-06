import { useSelector } from 'react-redux';
import type { CartItemsType } from '../../store/cart/reducer';
import { Button } from '../ui/Button';
import { Spacer } from '../ui/spacer';

import { loadStripe } from '@stripe/stripe-js';
import type { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  items: number;
  cartProducts: CartItemsType[];
};
export function OrderSummary({
  total,
  subtotal,
  shipping,
  items,
  cartProducts,
}: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'CartPage' });
  const userData = useSelector(
    (state: RootState) => state.user?.userData?.data
  );
  const sessionToken = userData?.token || '';

  async function handleMakePayment() {
    const language = localStorage.getItem('language');
    const headers = {
      'Content-Type': 'application/json',
      token: `Bearer ${sessionToken}`,
    };

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session/${
          language?.toLowerCase() || 'en'
        }`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(cartProducts),
        }
      );

      const session = await response.json();

      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      console.log('🚀 ~ handleMakePayment ~ result:', result);
      // if the payment was successful then reset the cart
    } catch (error) {
      console.log('Payment error:', error);
    }
  }
  return (
    <div className=' rounded-md p-4 shadow h-[300px] sticky top-12 bg-white flex justify-between flex-col'>
      <h3 className='text-2xl font-bold'> {t('orderSummary')}</h3>
      <div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>
            <b> {t('subtotal')}:</b>
          </p>
          <p className='text-xl'>${subtotal}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>
            <b> {t('items')}:</b>
          </p>
          <p className='text-xl'>{items}</p>
        </div>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'> {t('shipping')}:</p>
          <p className='text-xl'>${shipping}</p>
        </div>

        <Spacer size={8} />
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>
            <b> {t('total')}:</b>
          </p>
          <p className='text-xl'>${total}</p>
        </div>
      </div>
      <Spacer size={8} />
      <Button
        disabled={total === 0}
        onClick={handleMakePayment}
        className='lg:w-[250px]'
      >
        {t('placeOrderButton')}
      </Button>
    </div>
  );
}
