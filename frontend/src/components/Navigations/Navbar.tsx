import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { ShoppingCart } from './ShoppingCart';
import { LanguagesSelect } from '../Language/LanguagesSelect';
import { Container } from '../Grid/Container';
import { WishList } from './WishList';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import SearchSelector from './SearchSelector';
import { MyAccountDropdown } from './MyAccountDropdown';
import type { UserType } from '../../store/userData/reducer';
import { useTranslation } from 'react-i18next';
import React from 'react';
import toast from 'react-hot-toast';
import { fetchWishlist } from '../../store/wishList/apiCalls';
import { fetchCartData } from '../../store/cart/apiCalls';

export function Navbar() {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'HeaderSection' });
  const state = useSelector((state: RootState) => state);
  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  const cartQuantity = state.cart.quantity;
  const withListQuantity = state?.wishlist?.data?.length;

  const navLinks = [
    {
      name: t('register'),
      slug: '/register',
    },
    {
      name: t('login'),
      slug: '/login',
    },
  ];

  // fetch cart and favorite data only if we do not have theior data in redux, this way we will prevent overfetching teh data each time
  React.useEffect(() => {
    const language = localStorage.getItem('language');
    async function fetchData() {
      // Wishlist data
      if (withListQuantity === 0) {
        const responseWishlist = await fetchWishlist({
          dispatch,
          token: sessionToken,
          language: language?.toLowerCase() || 'en',
        });

        if (responseWishlist?.error) {
          toast.error(responseWishlist.error);
        }
      }

      // Cart data
      if (cartQuantity === 0) {
        const responseCart = await fetchCartData({
          dispatch,
          token: sessionToken,
          language: language?.toLowerCase() || 'en',
        });

        if (responseCart?.error) {
          if (responseCart.error !== 'Cart not found') {
            toast.error(responseCart.error);
          }
        }
      }
    }
    sessionToken && fetchData();
  }, []);
  return (
    <div className='w-full h-14 bg-gray-300 flex items-center fixed top-0 z-50'>
      <Container className='w-full h-full flex items-center justify-center'>
        <div className='flex justify-between w-full '>
          <div className='flex flex-1 gap-4 items-center'>
            {/* Languages */}
            <LanguagesSelect />

            {/* Search */}
            <SearchSelector />
          </div>

          {/* Logo */}
          <div className='flex flex-1 justify-center'>
            <Logo />
          </div>

          {/* Links */}
          <div className='flex flex-1 items-center justify-end gap-4'>
            {/* Wish list */}
            <div title='Wish List'>
              <WishList quantity={withListQuantity} />
            </div>

            {/* Cart */}
            <div title='Cart'>
              <ShoppingCart quantity={cartQuantity} />
            </div>

            {sessionToken ? (
              <MyAccountDropdown
                userData={userData?.data as UserType['data']['data']}
              />
            ) : (
              navLinks.map((navLink) => {
                return (
                  <NavLinks
                    key={navLink.slug}
                    name={navLink.name}
                    slug={navLink.slug}
                  />
                );
              })
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
