import React, { useRef } from 'react';
import { Spacer } from '../ui/spacer';
import type { UserType } from '../../store/userData/reducer';
import { cn } from '../../lib/utils';
import { IconLogout } from '@tabler/icons-react';

type Props = {
  userData: UserType['data']['data'];
};
export function MyAccountDropdown({ userData }: Props) {
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

  function handleLogout() {
    localStorage.removeItem('persist:root');
    window.location.reload();
  }

  return (
    <div className='relative' ref={containerRef}>
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
        <div className='absolute top-10 right-0 w-[260px] bg-white/90 shadow-lg  rounded-md z-50 p-3 gap-2 flex flex-col'>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p>
              <b>Username: </b>
              {userData?.userName}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p>
              <b>Full Name: </b>
              {userData?.name + ' ' + userData?.lastName || ''}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p>
              <b>Role: </b>
              {userData?.isAdmin ? 'Admin' : 'User'}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p className=' wrap-break-word '>
              <b>Email: </b>
              {userData?.email}
            </p>
          </div>
          <Spacer size={4} />
          <div
            onClick={handleLogout}
            className='hover:text-white  p-2 relative rounded-sm w-full justify-between items-center flex  hover:bg-gray-400 transition-all cursor-pointer'
          >
            <b>Log out</b>
            <IconLogout size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
