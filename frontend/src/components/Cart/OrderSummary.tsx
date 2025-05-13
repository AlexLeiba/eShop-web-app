import { Button } from '../ui/Button';
import { Spacer } from '../ui/spacer';

import { loadStripe } from '@stripe/stripe-js';

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
  async function handleMakePayment() {
    const bodyProductDataToCheckout = [
      {
        productId: 'hereIsProductId1',
        price: 50,
        quantity: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
      },
      {
        productId: 'hereIsProductId2',
        price: 50,
        quantity: 3,
        name: 'Product 2',
        image: 'https://via.placeholder.com/150',
      },
      {
        productId: 'hereIsProductId3',
        price: 50,
        quantity: 2,
        name: 'Product 3',
        image: 'https://via.placeholder.com/150',
      },
    ];

    const headers = {
      'Content-Type': 'application/json',
    };

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(bodyProductDataToCheckout),
        }
      );

      const session = await response.json();

      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      console.log('🚀 ~ handleMakePayment ~ result:', result);
      // if it wes payment successful then reset the cart
    } catch (error) {
      console.log('Payment error:', error);
    }
  }
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
      <Button onClick={handleMakePayment} className='w-[250px]'>
        Place Order
      </Button>
    </div>
  );
}
