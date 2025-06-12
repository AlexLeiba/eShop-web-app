import React from 'react';
import SlideButton from './SlideButton';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Container } from '../Grid/Container';
import type { ProductsDataType } from '../../pages/ProductsList';
import { useTranslation } from 'react-i18next';
import { IconLoader } from '@tabler/icons-react';

type SliderProps = {
  data: ProductsDataType['data'];
};
export function Slider({ data }: SliderProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'DashboardPage' });

  const [slide, setSlide] = React.useState(0);

  function handleSlide(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      setSlide((prev) => {
        if (prev === 0) return data?.slice(0, 3).length - 1;
        return prev - 1;
      });
    } else {
      setSlide((prev) => {
        if (data?.slice(0, 3).length - 1 === prev) return 0;

        return prev + 1;
      });
    }
  }
  return (
    <div className='w-full h-full relative flex overflow-x-hidden '>
      <SlideButton
        disabled={data?.length === 0}
        direction='prev'
        title='Prev'
        onClick={() => handleSlide('prev')}
      />
      <SlideButton
        disabled={data?.length === 0}
        direction='next'
        title='Next'
        onClick={() => handleSlide('next')}
      />

      {data && data.length > 0 ? (
        data?.slice(0, 3).map((item) => {
          return (
            <Container
              style={{
                minWidth: '100vw',
                transform: `translateX(${slide === 0 ? 0 : -(slide * 100)}vw)`,
                transition: 'transform 0.5s ease-in-out',
                backgroundColor: item.featuredBackgroundColor,
              }}
              key={item._id}
              className={cn(
                'pt-[152px] overflow-hidden h-[700px] text-black bg-white flex items-center'
              )}
            >
              <div className='grid lg:grid-cols-2  md:grid-cols-1 items-center gap-8'>
                <div className='flex justify-end'>
                  <img
                    className='w-[700px] lg:h-[500px] h-[250px] object-contain'
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className='flex gap-4 flex-col'>
                  <h1 className='lg:text-5xl md:text-5xl text-3xl font-bold line-clamp-1'>
                    {item.title.toUpperCase()}
                  </h1>
                  <p className='text-xl line-clamp-3 max-w-[600px] pr-8'>
                    {item.description}
                  </p>
                  <Link to={`/product/${item._id}`}>
                    <Button
                      className='lg:w-[200px] w-full '
                      size='large'
                      variant='primary'
                    >
                      <p className='text-2xl'>{t('shopNowButton')}</p>
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          );
        })
      ) : (
        <div
          style={{
            minWidth: '100vw',
          }}
          className={cn(
            'pt-[56px] overflow-hidden h-[700px] text-black bg-gray-400 animate-pulse flex items-center justify-center'
          )}
        >
          <IconLoader className='animate-spin text-white' />
        </div>
      )}
    </div>
  );
}
