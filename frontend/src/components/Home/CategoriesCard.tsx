import { useNavigate } from 'react-router-dom';
import type { CategoriesType } from '../../consts';
import { Button } from '../ui/Button';

type Props = {
  data: CategoriesType;
};

export function CategoriesCard({
  data,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  return (
    <div
      {...props}
      onClick={() =>
        navigate(
          `/products?sort=newest&page=1&category=${data.category.toLowerCase()}`
        )
      }
    >
      <div
        key={data.id}
        className='w-full scale-100 hover:scale-101 shadow hover:shadow-2xl transition-all ease-in-out flex items-center gap-4 p-4 h-[400px] bg-white rounded-lg  overflow-hidden flex-col justify-between'
      >
        <img
          className='w-full h-[220px] object-contain'
          src={data.image}
          alt={data.title}
        />

        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold'>{data.title}</h2>
          <p className='text-sm'>{data.description}</p>

          <Button className='lg:w-[200px] w-full  bg-black text-white'>
            {data.buttonTitle}
          </Button>
        </div>
      </div>
    </div>
  );
}
