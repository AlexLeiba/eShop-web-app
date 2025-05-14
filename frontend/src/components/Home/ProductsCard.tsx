import { Link } from 'react-router-dom';
import type { ProductsType } from '../../consts';
import { Button } from '../ui/Button';
import { IconEye, IconHeart, IconShoppingCart } from '@tabler/icons-react';

type Props = {
  data: ProductsType;
};

export function ProductsCard({ data }: Props) {
  return (
    // <Link to={`/product/${data.id}`}>
    <div
      key={data._id}
      className='group relative  scale-100 hover:scale-101 shadow hover:shadow-2xl transition-all ease-in-out flex items-center gap-4 p-4 h-[300px] bg-white rounded-lg  overflow-hidden flex-col justify-between '
    >
      <div className='transition-all bg-transparent  group-hover:bg-gray-400/50 absolute top-0 left-0 right-0 bottom-0 h-full w-full flex justify-center items-center gap-2'>
        <div className='group-hover:flex hidden transition-all  gap-2'>
          <Link to={'/cart'}>
            <Button className='w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all '>
              <IconShoppingCart />
            </Button>
          </Link>
          <Link to={'/wishlist'}>
            <Button className='w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all '>
              <IconHeart />
            </Button>
          </Link>
          <Link to={`/product/${data._id}`}>
            <Button className='w-[40px] p-1 bg-black text-white flex items-center justify-center scale-100 hover:scale-105 transition-all '>
              <IconEye />
            </Button>
          </Link>
        </div>
      </div>

      <img
        className='w-full h-[200px] object-cover'
        src={data.image}
        alt={data.title}
      />

      <div className='flex flex-col gap-4'>
        <h4 className='text-2xl font-bold '>{data.title}</h4>
      </div>
    </div>
    // </Link>
  );
}
