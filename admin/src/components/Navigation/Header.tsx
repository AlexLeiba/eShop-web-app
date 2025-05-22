import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import type { RootState } from '../../store/config';
import { Button } from '../ui/Button/Button';
import { logout } from '../../store/userData/reducers';

function Header() {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem('persist:root');
    dispatch(logout());
  }
  return (
    <div className='container-header'>
      <Logo />
      <div className='flex-center-row-8'>
        <p>{userData?.data.userName || 'Admin Name'}</p>

        <Button onClick={handleLogout} widthSize={100}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
