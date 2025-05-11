import { Link } from 'react-router-dom';
import { CartCard } from '../components/Cart/CartCard';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/spacer';
import type { ProductType } from './Product';
import { OrderSummary } from '../components/Cart/OrderSummary';

const cartData: ProductType[] = [
  {
    id: 1,
    title: 'Lorem Ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultrices aliquam, nunc diam aliquet nunc,  In hac habitasse platea dictumst.',
    image: 'https://picsum.photos/id/10/1200/800',
    price: 10,
    category: 'Shirts',
    color: 'Red',
    size: 'M',
    date: '2022-01-01',
    discount: 10,
    stock: 10,
  },
  {
    id: 2,
    title: 'Lorem Ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultrices aliquam, nunc diam aliquet nunc,  In hac habitasse platea dictumst.',
    image: 'https://picsum.photos/id/10/1200/800',
    price: 10,
    category: 'Shirts',
    color: 'Red',
    size: 'M',
    date: '2022-01-01',
    discount: 10,
    stock: 10,
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultrices aliquam, nunc diam aliquet nunc,  In hac habitasse platea dictumst.',
    image: 'https://picsum.photos/id/10/1200/800',
    price: 10,
    category: 'Shirts',
    color: 'Red',
    size: 'M',
    date: '2022-01-01',
    discount: 10,
    stock: 10,
  },
];

function Cart() {
  // const [searchParams] = useSearchParams();

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
          <h1 className='text-4xl font-medium text-center'>Your Cart</h1>
          <div className='grid grid-cols-[3fr_1fr] gap-8'>
            <div className='grid span-2 '>
              <Spacer size={8} />
              <div className='flex justify-between'>
                <Link to='/products' className='w-[250px]' type='secondary'>
                  <Button className='w-[250px]' type='secondary'>
                    Continue shopping
                  </Button>
                </Link>

                <Link to='/' className='w-[250px]'>
                  <Button className='w-[250px]'>Checkout now</Button>
                </Link>
              </div>

              <Spacer size={8} />

              {/* Cart products List */}
              <div className='flex gap-8 flex-col'>
                {cartData.map((cartItem) => {
                  return (
                    <div key={cartItem.id}>
                      <CartCard {...cartItem} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='grid span-2 '>
              <OrderSummary
                total={100}
                subtotal={100}
                shipping={100}
                shippingDiscount={100}
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
