import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const userData = useSelector((state: RootState) => state.user.userData?.data);

  const sessionToken = userData?.token || '';

  return <>{sessionToken ? children : <Navigate to='/login' />}</>;
}
