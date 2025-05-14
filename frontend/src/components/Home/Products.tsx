import { Spacer } from '../ui/spacer';
import { ProductsCard } from './ProductsCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { useSearchParams } from 'react-router-dom';
import type { ProductsDataType } from '../../pages/ProductsList';

type ProductsProps = {
  productsData: ProductsDataType;
  type: 'dashboard' | 'products-list';
};
export function Products({ productsData, type }: ProductsProps) {
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
    } else {
      const nextPage = (Number(searchParams.get('page')) || 0) + 1;
      // NEXT PAGE
      if (productsData.count > limitPerPage * (nextPage - 1)) {
        // TODO: return all products counted from backend/ check on change page if : limitPerPage * PAGE < ALLProducts
        params.set('page', nextPage.toString());
        setSearchParams(params);
      }
    }
  }
  return (
    <>
      <Spacer sm={8} md={8} lg={8} />

      {type === 'products-list' && (
        <p>
          Page: {searchParams.get('page')} /{' '}
          {Math.round(productsData.count / limitPerPage)}
        </p>
      )}
      <Spacer size={2} />

      <div className='grid grid-cols-4 gap-4  '>
        {productsData.data?.map((data) => {
          return <ProductsCard data={data} key={data._id} />;
        })}
      </div>
      <Spacer sm={8} md={8} lg={8} />
      {type === 'products-list' && (
        <div className='flex justify-between items-center gap-4'>
          <Button
            disabled={Number(searchParams.get('page')) === 1}
            variant='secondary'
            onClick={() => handleChangePage('prev')}
            className='w-[100px]'
          >
            <IconChevronLeft />
          </Button>

          <Button
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
