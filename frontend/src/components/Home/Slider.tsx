import React from 'react';
import { homeSliderColors, homeSliderData } from '../../consts';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import SlideButton from '../ui/SlideButton';
import { Button } from '../ui/Button';

export function Slider() {
  const [slide, setSlide] = React.useState(0);

  function handleSlide(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      setSlide((prev) => {
        if (prev === 0) return homeSliderData.length - 1;
        return prev - 1;
      });
    } else {
      setSlide((prev) => {
        if (homeSliderData.length - 1 === prev) return 0;

        return prev + 1;
      });
    }
  }
  return (
    <div className='w-full h-full relative flex overflow-x-hidden '>
      <SlideButton
        direction='prev'
        title='Prev'
        onClick={() => handleSlide('prev')}
      />
      <SlideButton
        direction='next'
        title='Next'
        onClick={() => handleSlide('next')}
      />

      {homeSliderData.map((data) => {
        return (
          <div
            style={{
              minWidth: '100vw',
              transform: `translateX(${slide === 0 ? 0 : -(slide * 100)}vw)`,
              transition: 'transform 0.5s ease-in-out',
              backgroundColor: homeSliderColors[data.id - 1],
            }}
            key={data.id}
            className={cn(
              'pt-[56px] overflow-hidden h-[700px] text-black bg-white flex items-center'
            )}
          >
            <div className='grid grid-cols-2 items-center'>
              <img className='w-[700px]' src={data.image} alt={data.title} />
              <div className='flex gap-4 flex-col'>
                <h2 className='text-5xl font-bold'>
                  {data.title.toUpperCase()}
                </h2>
                <p className='text-xl'>{data.description}</p>
                <Link to={data.buttonLink}>
                  <Button className='w-[200px]' size='large' type='primary'>
                    {data.buttonTitle}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
