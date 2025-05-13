import { type ProductsType } from '../../consts';

import { Spacer } from '../ui/spacer';
import { ProductsCard } from './ProductsCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { useSearchParams } from 'react-router-dom';

type ProductsProps = {
  data: ProductsType[];
};
export function Products({ data }: ProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limitPerPage = 5;
  const totalProducts = 20;

  function handleChangePage(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      const prevPage = Number(searchParams.get('page') || 0) - 1;
      if (prevPage < 0) return;
      setSearchParams({ page: prevPage.toString() });
    } else {
      const nextPage = (Number(searchParams.get('page')) || 0) + 1;

      if (totalProducts > limitPerPage * nextPage - 1) {
        // TODO: return all products counted from backend/ check on change page if : limitPerPage * PAGE < ALLProducts
        setSearchParams({ page: nextPage.toString() });
      }
    }
  }
  return (
    <>
      <Spacer sm={8} md={8} lg={8} />

      <div className='grid grid-cols-4 gap-4 '>
        {data?.map((data) => {
          return <ProductsCard data={data} key={data._id} />;
        })}
      </div>
      <Spacer sm={8} md={8} lg={8} />
      <div className='flex justify-between items-center gap-4'>
        <Button onClick={() => handleChangePage('prev')} className='w-[100px]'>
          <IconChevronLeft />
        </Button>

        <Button onClick={() => handleChangePage('next')} className='w-[100px]'>
          <IconChevronRight />
        </Button>
      </div>
    </>
  );
}
