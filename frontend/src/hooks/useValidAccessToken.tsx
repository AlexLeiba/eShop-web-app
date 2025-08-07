import { axiosPrivateInstance } from '../lib/axiosInstance';
import { useEffect } from 'react';
import { useSessionToken } from './useSesstionToken';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../store/userData/apiCalls';
import { useDispatch } from 'react-redux';

export function usePrivateAxiosInstance() {
  // const { handleRefreshToken } = useRefreshToken();
  const dispatch = useDispatch();

  const sessionToken = useSessionToken();

  useEffect(() => {
    //Will fire before any req
    const requestIntersept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        const decodedUserData = jwtDecode(sessionToken);

        // exp is in seconds, so convert to ms
        if (sessionToken && decodedUserData.exp) {
          const expiryInMilliseconds = decodedUserData.exp * 1000;
          const nowInMilliseconds = Date.now();

          if (expiryInMilliseconds < nowInMilliseconds) {
            //TODO: if the token is expired, we will refresh it
            //   handleRefreshToken();

            logout({ sessionToken, dispatch });
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      //   axiosPrivateInstance.interceptors.response.eject(responseIntersept); //remove interceptor
      axiosPrivateInstance.interceptors.request.eject(requestIntersept);
    }; //remove interceptor} ]
  }, [sessionToken, dispatch]);

  return axiosPrivateInstance; //by the time we return the axios instance, the token will be checked
}
