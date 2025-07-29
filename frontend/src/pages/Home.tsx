import { Link, useLocation } from 'react-router-dom';
import { Container } from '../components/Grid/Container';
import { Categories } from '../components/Home/Categories';
import { Newsletter } from '../components/Home/Newsletter';
import { Products } from '../components/Home/Products';
import { Announcement } from '../components/ui/Announcement';
import { Slider } from '../components/ui/Slider';
import { Spacer } from '../components/ui/spacer';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import React from 'react';
import type { ProductsDataType } from './ProductsList';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/Layout/Layout';

function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'DashboardPage' });
  const { pathname } = useLocation();
  const [productsData, setProductsData] = React.useState<ProductsDataType>({
    data: [],
    count: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const [featuredProductsData, setFeaturedProductsData] =
    React.useState<ProductsDataType>({
      data: [],
      count: 0,
    });

  useEffect(() => {
    const language = localStorage.getItem('language') || 'en';
    async function fetchData() {
      try {
        setLoading(true);
        // get products
        const responseProductsData = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?sort=newest&limit=8&language=${language?.toLowerCase()}`
        );
        const parsedProductsData: ProductsDataType =
          await responseProductsData.json();

        setProductsData({
          data: parsedProductsData.data,
          count: parsedProductsData.count,
        });

        // get featured products

        const responseFeaturedProductsData = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/featured-products?language=${language?.toLowerCase()}`
        );

        const parsedFeaturedProductsData: ProductsDataType =
          await responseFeaturedProductsData.json();

        setFeaturedProductsData({
          data: parsedFeaturedProductsData.data,
          count: parsedFeaturedProductsData.data.length,
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [pathname]);
  return (
    <Layout>
      <Announcement title='lorem20 is coming soon dsdsadsa sdadsa dsadsad' />
      <div className='flex flex-grow-1 flex-col'>
        {/* FEATURED PRODUCTS HERO SLIDER */}
        <Container fluid>
          <Slider data={featuredProductsData.data} />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* CATEGORIES */}
        <Container>
          <Categories />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* PRODUCTS */}
        <Container>
          <div className='flex justify-between items-center'>
            <h2 className='text-4xl font-bold'>{t('ProductsSection.title')}</h2>
            <Link to={'/products?sort=newest&page=1'}>
              <p className='text-2xl font-bold underline'>
                {t('ProductsSection.allProducts')}
              </p>
            </Link>
          </div>
          <Products
            loading={loading}
            type='dashboard'
            productsData={productsData}
          />
        </Container>

        {/* NEWSLETTER */}
        <Spacer sm={16} md={24} lg={24} />
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
    </Layout>
  );
}

export default Home;
