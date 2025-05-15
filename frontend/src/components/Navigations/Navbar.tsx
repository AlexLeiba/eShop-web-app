import React from 'react';
import { SearchInput } from '../ui/SearchInput';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { ShoppingCart } from './ShoppingCart';
import { LanguagesSelect } from './LanguagesSelect';
import { Container } from '../Grid/Container';
import { WishList } from './WishList';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export function Navbar() {
  const state = useSelector((state: RootState) => {
    return state;
  });
  const cartQuantity = state.cart.quantity;
  const withListQuantity = state.wishList.length;

  const [search, setSearch] = React.useState('');

  const navLinks = [
    {
      name: 'Register',
      slug: '/register',
    },
    {
      name: 'Login',
      slug: '/login',
    },
  ];
  return (
    <div className='w-full h-14 bg-gray-300 flex items-center fixed top-0 z-50'>
      <Container className='w-full h-full flex items-center justify-center'>
        <div className='flex justify-between w-full '>
          <div className='flex flex-1 gap-4 items-center'>
            {/* Languages */}
            <LanguagesSelect />

            {/* Search */}
            <SearchInput
              label={''}
              placeholder={''}
              value={search}
              onChange={setSearch}
              error={''}
              type={'text'}
            />
          </div>

          {/* Logo */}
          <div className='flex flex-1 justify-center'>
            <Logo />
          </div>

          {/* Links */}
          <div className='flex flex-1 items-center justify-end gap-4'>
            {navLinks.map((navLink) => {
              return (
                <NavLinks
                  key={navLink.slug}
                  name={navLink.name}
                  slug={navLink.slug}
                />
              );
            })}

            {/* Wish list */}
            <div title='Wish List'>
              <WishList quantity={withListQuantity} />
            </div>

            {/* Cart */}
            <div title='Cart'>
              <ShoppingCart quantity={cartQuantity} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
