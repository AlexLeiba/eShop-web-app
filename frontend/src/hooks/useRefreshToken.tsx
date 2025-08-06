import { useDispatch } from 'react-redux';
import { axiosPrivateInstance } from '../lib/axiosInstance';
import { refreshToken } from '../store/userData/reducer';
// import { useSessionToken } from './useSesstionToken';

export function useRefreshToken() {
  // const sessionToken = useSessionToken();

  const dispatch = useDispatch();

  // dispatch(fetchUserData());

  async function handleRefreshToken() {
    const { data: response } = await axiosPrivateInstance({
      method: 'POST',
      url: `/api/refresh-token`,
    });
    console.log('🚀 ~ handleRefreshToken ~ response:', response);

    // TODO to add token in REdux store
    dispatch(refreshToken('newToken'));

    return response;
  }
  return { handleRefreshToken };
}
