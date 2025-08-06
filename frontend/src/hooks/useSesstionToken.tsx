import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export function useSessionToken() {
  const accessToken = useSelector(
    (state: RootState) => state.user.userData?.token
  );

  return accessToken;
}
