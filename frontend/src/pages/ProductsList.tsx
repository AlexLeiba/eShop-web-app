import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Products } from '../components/Home/Products';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import Filter from '../components/Products/Filter';
import { Announcement } from '../components/ui/Announcement';

import { Spacer } from '../components/ui/spacer';
import { useSearchParams } from 'react-router-dom';
import { productsData } from '../consts';

function ProductsList() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
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
          <div className='flex justify-between items-center'>
            <h2 className='text-4xl font-bold'>
              Products{' '}
              {selectedCategory && (
                <span className='text-2xl text-gray-500'>
                  {'/' + selectedCategory || ''}
                </span>
              )}
            </h2>
            <Spacer sm={8} md={8} lg={8} />
            {/* Selected category */}

            <h2 className='text-2xl text-gray-500 font-semibold'></h2>
          </div>
          <Spacer size={8} />

          {/* Filters */}
          <div className='flex justify-between items-center '>
            <div className='flex align-center gap-2'>
              <p className='text-2xl font-semibold'>Filter :</p>
              <div className='flex gap-4'>
                <Filter type='color' />
                <Filter type='size' />
              </div>
            </div>
            <div className='flex align-center gap-2'>
              <p className='text-2xl font-semibold'>Sort :</p>
              <div className='flex gap-4'>
                <Filter type='date' />
              </div>
            </div>
          </div>

          {/* Products */}
          <Spacer size={8} />
          <Products data={productsData} />
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

export default ProductsList;
