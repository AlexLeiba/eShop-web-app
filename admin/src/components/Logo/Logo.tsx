import { IconShieldCog } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import './Logo.scss';

export function Logo() {
  return (
    <Link to={'/'}>
      <div className='container-logo'>
        <h3>eShop Admin</h3>
        <IconShieldCog />
      </div>
    </Link>
  );
}
