import React, { useRef } from 'react';
import { Spacer } from '../ui/spacer';
import type { UserType } from '../../store/userData/reducer';
import { cn } from '../../lib/utils';
import { IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/userData/apiCalls';
// import { axiosPrivateInstance } from '../../lib/axiosInstance';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../lib/axiosInstance';

type Props = {
  userData: UserType['data'];
  withListQuantity: number;
  cartQuantity: number;
};
export function MyAccountDropdown({
  userData,
  withListQuantity,
  cartQuantity,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'HeaderSection.MyAccount',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    });

    return () => document.removeEventListener('click', () => {});
  }, []);

  // function handleLogout() {
  //   logout({ dispatch, axiosPrivateInstance });
  //   localStorage.removeItem('persist:root');
  //   window.location.reload();
  // }

  async function handleLogout() {
    const responseLogin = await logout({
      dispatch,
      axiosInstance,
    });

    if (responseLogin?.data) {
      navigate('/login');
    }
    if (responseLogin?.error) {
      toast.error(responseLogin.error);
    }
  }

  const dropdownLinks = [
    {
      name: t('wishlist'),
      slug: '/wishlist',
      value: withListQuantity,
    },
    {
      name: t('cart'),
      slug: '/cart',
      value: cartQuantity,
    },
    {
      name: t('myOrders'),
      slug: '/orders',
      value: 0,
    },
  ];
  const dropdownUserData = [
    {
      name: t('username'),
      value: userData?.userName,
    },
    {
      name: t('fullName'),
      value: userData?.name + ' ' + userData?.lastName || '',
    },
    {
      name: t('role'),
      value: userData?.isAdmin ? 'Admin' : 'User',
    },
    {
      name: t('email'),
      value: userData?.email,
    },
  ];

  return (
    <div className='relative' ref={containerRef} title='My Account'>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          open ? 'bg-gray-400' : '',
          'border-2 border-white hover:text-white shadow-md relative rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-500 transition-all cursor-pointer'
        )}
      >
        <p>{userData?.isAdmin ? '👑' : '👤'}</p>
      </div>

      {open && (
        <div className='absolute top-10 right-0 w-[280px] bg-white/90 shadow-lg  rounded-md z-50 p-3 gap-2 flex flex-col'>
          {dropdownLinks.map((dropdownLink) => {
            return (
              <Link to={dropdownLink.slug} key={dropdownLink.slug}>
                <div className='   relative rounded-sm w-full flex-col flex   transition-all '>
                  <p className='line-clamp-1'>
                    <b className='hover:opacity-55'>{dropdownLink.name}</b>
                    {dropdownLink.value !== 0 && (
                      <span className='font-medium p-1 size-6 inline-flex justify-center items-center text-white bg-gray-900 rounded-full ml-2'>
                        {dropdownLink.value}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}

          <Spacer size={2} />

          {dropdownUserData.map((dropdownUserData) => {
            return (
              <div key={dropdownUserData.name}>
                <p className=' wrap-break-word '>
                  <b>{dropdownUserData.name}</b>
                  {dropdownUserData.value && (
                    <span className='ml-2'>{dropdownUserData.value}</span>
                  )}
                </p>
              </div>
            );
          })}

          <Spacer size={4} />
          <div
            onClick={handleLogout}
            className='hover:text-white  p-2 relative rounded-sm w-full justify-between items-center flex  hover:bg-gray-400 transition-all cursor-pointer'
          >
            <b>{t('logout')}</b>
            <IconLogout size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
