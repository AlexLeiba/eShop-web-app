import { Link } from 'react-router-dom';
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
import { IconShoppingCart } from '@tabler/icons-react';
import { CartCard } from '../components/Cart/CartCard';
import { clearCart } from '../store/cart/reducer';

function Cart() {
  const dispatch = useDispatch();
  const { cart: cartData } = useSelector((state: RootState) => state);
  function handleClearList() {
    dispatch(clearCart());
  }
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

      <div className=''>
        <Container>
          <div className='flex gap-2 justify-center items-center'>
            <h1 className='text-4xl font-medium text-center'>Your Cart</h1>
            <IconShoppingCart size={32} />
          </div>
          <div className='grid grid-cols-[3fr_1fr] gap-8'>
            <div className='grid span-2 '>
              <Spacer size={8} />
              {cartData.products.length > 0 && (
                <div className='flex justify-between'>
                  <Link
                    to='/products?sort=newest&page=1'
                    className='w-[250px]'
                    type='secondary'
                  >
                    <Button className='w-[250px]' variant='secondary'>
                      Continue shopping
                    </Button>
                  </Link>

                  <Button onClick={handleClearList} className='w-[150px]'>
                    Clear cart
                  </Button>
                </div>
              )}
              <Spacer size={8} />

              {/* Cart products List */}
              <div className='flex gap-8 flex-col'>
                {cartData.products.map((cartItem) => {
                  return (
                    <div key={cartItem._id + cartItem.color + cartItem.size}>
                      <CartCard cartData={cartItem} type='cart' />
                    </div>
                  );
                })}
                {cartData.products.length === 0 && (
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold'>Your cart is empty</h2>
                    <Link
                      to='/products?sort=newest&page=1'
                      className='w-[250px]'
                    >
                      <Spacer size={4} />
                      <Button className='w-[250px]' variant='secondary'>
                        Continue shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className='grid span-2 '>
              <OrderSummary
                total={cartData.total}
                subtotal={cartData.total}
                items={cartData.products
                  .map((item) => item.quantity)
                  .reduce((acc, curr) => (acc += curr), 0)}
                shipping={0}
              />
            </div>
          </div>
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
