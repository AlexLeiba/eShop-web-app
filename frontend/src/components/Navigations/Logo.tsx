import { IconShoppingBag } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div title='HOME'>
      <Link to={'/'} className='flex items-center '>
        <p className='font-semibold text-2xl flex items-center'>
          <span className='text-green-500'>E</span>Sh
          <span className='inline-flex '>
            <IconShoppingBag className='text-green-500' />
          </span>
          p
        </p>
      </Link>
    </div>
  );
}
