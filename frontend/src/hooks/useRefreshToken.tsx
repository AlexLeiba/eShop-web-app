import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { axiosPrivateInstance } from '../lib/axiosInstance';
import { refreshToken } from '../store/userData/reducer';

export function useRefreshToken() {
  const accessToken = useSelector(
    (state: RootState) => state.user?.userData?.token
  );
  console.log('🚀 ~ useRefreshToken ~ accessToken:', accessToken);
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
