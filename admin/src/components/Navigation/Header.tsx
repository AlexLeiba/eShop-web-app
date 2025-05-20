import { Logo } from '../Logo/Logo';
import './Header.scss';

type Props = {
  username: string;
};
function Header({ username }: Props) {
  return (
    <div className='container-header'>
      <Logo />

      <p>{username || 'Admin Name'}</p>
    </div>
  );
}

export default Header;
