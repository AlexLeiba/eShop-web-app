import { Navigate } from 'react-router-dom';
import { useSessionToken } from '../hooks/useSesstionToken';

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const accessToken = useSessionToken();

  return <>{accessToken ? children : <Navigate to='/login' />}</>;
}
