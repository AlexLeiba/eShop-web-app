import React from 'react';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/spacer';
import { OrderSummary } from '../components/Cart/OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import {
  IconChevronLeft,
  IconShoppingCart,
  IconTrash,
} from '@tabler/icons-react';
import { CartCard } from '../components/Cart/CartCard';
import { Loader } from '../components/ui/Loader';
import { clearAllCartProducts, fetchCartData } from '../store/cart/apiCalls';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Cart() {
  const { t } = useTranslation('translation', { keyPrefix: 'CartPage' });
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  const { cart: cartData } = useSelector((state: RootState) => state);

  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  async function handleClearList() {
    const response = await clearAllCartProducts({
      dispatch,
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t('toast.clearedCart'));
    }
  }

  React.useEffect(() => {
    const language = localStorage.getItem('language');
    async function fetchData() {
      setLoading(true);
      const response = await fetchCartData({
        dispatch,
        token: sessionToken,
        language: language?.toLowerCase() || 'en',
      });

      if (response?.error) {
        if (response.error !== 'Cart not found') {
          toast.error(response.error);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <Navbar />
      <Announcement
        title='lorem20 is coming soon dsdsadsa sdadsa dsadsad'
        link='google.com'
        linkTitle='Read More'
      />

      <Spacer sm={16} md={24} lg={24} />

      <div className='flex flex-grow-1 flex-col'>
        <Container>
          <div className='flex gap-2 justify-center items-center'>
            <h1 className='text-4xl font-medium text-center'> {t('title')}</h1>
            <IconShoppingCart size={32} />
          </div>

          <Loader loading={loading} className='h-[152px]'>
            <div className='grid grid-cols-[3fr_1fr] gap-8'>
              <div className='grid span-2 '>
                <Spacer size={8} />
                {cartData?.products?.length > 0 && (
                  <div className='flex justify-between'>
                    <Link to='/products?sort=newest&page=1'>
                      <Button className='w-[250px]' variant='secondary'>
                        <IconChevronLeft className='ml-2' />{' '}
                        {t('continueShoppingButton')}
                      </Button>
                    </Link>

                    <Button
                      onClick={handleClearList}
                      className='w-[200px]'
                      variant='secondary'
                    >
                      {t('clearCartButton')}{' '}
                      <IconTrash className='ml-2 text-red-500' />
                    </Button>
                  </div>
                )}
                <Spacer size={8} />

                {/* Cart products List */}
                <div className='flex gap-8 flex-col'>
                  {cartData?.products?.map((item) => {
                    return (
                      <div key={item._id + item.color + item.size}>
                        <CartCard productData={item} type='cart' />
                      </div>
                    );
                  })}
                  {!cartData?.products?.length && (
                    <div className='flex flex-col items-center justify-center'>
                      <h2 className='text-2xl font-bold'>{t('emptyCart')}</h2>
                      <Spacer size={4} />
                      <Link to='/products?sort=newest&page=1'>
                        <Button className='w-[250px]' variant='secondary'>
                          <IconChevronLeft className='ml-2' />
                          {t('continueShoppingButton')}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className='grid span-2 '>
                <OrderSummary
                  cartProducts={cartData?.products}
                  total={cartData.total}
                  subtotal={cartData.total}
                  items={cartData?.products
                    ?.map((item) => item.quantity)
                    .reduce((acc, curr) => (acc += curr), 0)}
                  shipping={0}
                />
              </div>
            </div>
          </Loader>
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
