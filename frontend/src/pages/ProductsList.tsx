import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Products } from '../components/Home/Products';
import Filter from '../components/Products/Filter';
import { Announcement } from '../components/ui/Announcement';

import { Spacer } from '../components/ui/spacer';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import {
  filterCategories,
  filterColors,
  filterSizes,
  sortOptions,
  type ProductsType,
} from '../consts';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/Layout/Layout';

export type ProductsDataType = {
  data: ProductsType[];
  count: number;
};

function ProductsList() {
  const { t } = useTranslation('translation', { keyPrefix: 'ProductsPage' });
  const location = useLocation();

  const [productsData, setProductsData] = React.useState<ProductsDataType>({
    data: [],
    count: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    const language = localStorage.getItem('language');
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?language=${
            language?.toLowerCase() || 'en'
          }&${location.search}`
        );
        const responseData: ProductsDataType = await response.json();

        setProductsData({
          data: responseData.data,
          count: responseData.count,
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  return (
    <Layout>
      <Announcement
        title='lorem20 is coming soon dsdsadsa sdadsa dsadsad'
        link='google.com'
        linkTitle='Read More'
      />

      <Spacer size={24} />

      <div className=''>
        <Container>
          <div className='flex justify-between items-center'>
            <h2 className='text-4xl font-bold'>
              {t('title')}
              {selectedCategory && selectedCategory !== 'all' && (
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
          <div className='flex justify-between items-center flex-wrap gap-4'>
            <div className='flex align-center gap-2 flex-wrap'>
              <p className='text-2xl font-semibold'>{t('filter')} :</p>
              <div className='flex gap-4 flex-wrap'>
                <Filter type='color' data={filterColors} />
                <Filter type='size' data={filterSizes} />
                <Filter type='category' data={filterCategories} />
              </div>
            </div>
            <div className='flex align-center gap-2'>
              <p className='text-2xl font-semibold'>{t('sort')} :</p>
              <div className='flex gap-4'>
                <Filter type='sort' data={sortOptions} />
              </div>
            </div>
          </div>

          {/* Products */}
          <Spacer size={8} />
          <Products
            loading={loading}
            productsData={productsData}
            type='products-list'
          />
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
    </Layout>
  );
}

export default ProductsList;
