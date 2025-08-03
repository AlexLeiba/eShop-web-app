import { Spacer } from '../ui/spacer';
import { ProductsCard } from './ProductsCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { useSearchParams } from 'react-router-dom';
import type { ProductsDataType } from '../../pages/ProductsList';
import { Loader } from '../ui/Loader';
import { useTranslation } from 'react-i18next';

type ProductsProps = {
  productsData: ProductsDataType;
  type: 'dashboard' | 'products-list';
  loading: boolean;
};
export function Products({ productsData, type, loading }: ProductsProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'ProductsPage' });
  const [searchParams, setSearchParams] = useSearchParams();
  const limitPerPage = 12;

  function handleChangePage(direction: 'prev' | 'next') {
    const params = new URLSearchParams(searchParams);

    // PREV PAGE
    if (direction === 'prev') {
      const prevPage = Number(searchParams.get('page') || 0) - 1;
      if (prevPage === 0) return;

      params.set('page', prevPage.toString());
      setSearchParams(params);
      window.scrollTo(0, 0);
    } else {
      const nextPage = (Number(searchParams.get('page')) || 0) + 1;
      // NEXT PAGE
      if (productsData.count > limitPerPage * (nextPage - 1)) {
        // TODO: return all products counted from backend/ check on change page if : limitPerPage * PAGE < ALLProducts
        params.set('page', nextPage.toString());
        setSearchParams(params);
        window.scrollTo(0, 0);
      }
    }
  }

  return (
    <>
      <Spacer sm={8} md={8} lg={8} />

      {type === 'products-list' && (
        <div className='flex gap-4 items-center'>
          <p className='text-1xl font-bold'>
            {t('found')}: {productsData.count}
          </p>
          <p>
            {t('page')}: {searchParams.get('page')} /{' '}
            {Math.ceil(productsData.count / limitPerPage) || 1}
          </p>
        </div>
      )}
      <Spacer size={2} />

      <Loader loading={loading} className='h-[200px]'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4  '>
          {productsData?.data && productsData.data.length > 0 ? (
            productsData.data?.map((data) => {
              return <ProductsCard data={data} key={data._id} />;
            })
          ) : (
            <p>{t('noProductsFound')}</p>
          )}
        </div>
      </Loader>
      <Spacer sm={8} md={8} lg={8} />
      {type === 'products-list' && (
        <div className='flex justify-between items-center gap-4'>
          <Button
            title='Previous page'
            disabled={Number(searchParams.get('page')) === 1}
            variant='secondary'
            onClick={() => handleChangePage('prev')}
            className='w-[100px]'
          >
            <IconChevronLeft />
          </Button>

          <Button
            title='Next page'
            disabled={
              limitPerPage * Number(searchParams.get('page')) >
              productsData.count
            }
            variant='secondary'
            onClick={() => handleChangePage('next')}
            className='w-[100px]'
          >
            <IconChevronRight />
          </Button>
        </div>
      )}
    </>
  );
}
