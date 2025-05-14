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
import { categoiesData } from '../consts';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import React from 'react';

function Home() {
  const [productsData, setProductsData] = React.useState({
    data: [],
    count: 0,
  });
  // const [categoriesData, setCategoriesData] = React.useState({
  //   data: [],
  //   count: 0,
  // });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?sort=newest&limit=8`
        );
        const responseProducts = await response.json();

        setProductsData({
          data: responseProducts.data,
          count: responseProducts.count,
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchData();
  }, []);
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <Announcement title='lorem20 is coming soon dsdsadsa sdadsa dsadsad' />
      <div className='flex flex-grow-1 flex-col'>
        {/* FEATURED PRODUCTS HERO SLIDER */}
        <Container fluid>
          <Slider data={productsData.data} />
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
            <Link to={'/products?sort=newest&page=1'}>
              <p className='text-2xl font-bold underline'>All products</p>
            </Link>
          </div>
          <Products type='dashboard' productsData={productsData} />
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
