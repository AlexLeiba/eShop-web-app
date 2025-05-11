import { Link } from 'react-router-dom';
import { Container } from '../components/Grid/Container';
import { Categories } from '../components/Home/Categories';
import { Newsletter } from '../components/Home/Newsletter';
import { Products } from '../components/Home/Products';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import { Announcement } from '../components/ui/Announcement';
import { Slider } from '../components/ui/Slider';
import { Spacer } from '../components/ui/spacer';
import { categoiesData, productsData } from '../consts';

function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <Announcement title='lorem20 is coming soon dsdsadsa sdadsa dsadsad' />
      <div className='flex flex-grow-1 flex-col'>
        {/* FEATURED PRODUCTS HERO SLIDER */}
        <Container fluid>
          <Slider data={productsData} />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* CATEGORIES */}
        <Container>
          <Categories data={categoiesData} />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* PRODUCTS */}
        <Container>
          <div className='flex justify-between items-center'>
            <h2 className='text-4xl font-bold'>Products</h2>
            <Link to={'/products'}>
              <p className='text-2xl font-bold underline'>All products</p>
            </Link>
          </div>
          <Products data={productsData} />
        </Container>

        {/* NEWSLETTER */}
        <Spacer sm={16} md={24} lg={24} />
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
