import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div className=''>
      <Link to={'/'}>
        <p className='font-semibold text-2xl'>EShop</p>
      </Link>
    </div>
  );
}
