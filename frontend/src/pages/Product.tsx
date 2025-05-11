import React from 'react';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import AddAmount from '../components/Products/AddAmount';
import Colors from '../components/Products/Colors';
import Filter from '../components/Products/Filter';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';

import { Spacer } from '../components/ui/spacer';

const productData = {
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
};

export type ProductType = typeof productData;

function Product() {
  const [amount, setAmount] = React.useState(1);
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

      <Container>
        <div className='grid grid-cols-2 gap-8 '>
          {/* IMG */}
          <img src={productData.image} alt={productData.title} />

          {/* Details */}

          <div>
            <h3 className='text-4xl '>{productData.title}</h3>
            <Spacer size={4} />
            <p>{productData.description}</p>

            <Spacer size={4} />
            <p className='text-3xl'>${productData.price}</p>
            <Spacer size={12} />
            <div className='flex items-center gap-2'>
              <p className='text-xl'>Color</p>
              <Colors colors={['Red', 'Blue', 'Green', 'Yellow', 'Pink']} />
            </div>
            <Spacer size={6} />
            <div className='flex items-center gap-2'>
              <p className='text-xl'>Size</p>
              <Filter type='size' />
            </div>
            <Spacer size={6} />

            <div className='flex items-center gap-2'>
              <AddAmount setAmount={setAmount} amount={amount} />
            </div>
            <Spacer size={6} />
            <Button>Add to cart</Button>
            <Spacer size={6} />
          </div>
        </div>
      </Container>
      <Spacer sm={16} md={24} lg={24} />

      {/* Newsletter */}
      <Container fluid className='bg-gray-100 '>
        <Newsletter />
      </Container>

      <Footer />
    </div>
  );
}

export default Product;
