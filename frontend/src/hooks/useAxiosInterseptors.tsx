import { useRefreshToken } from './useRefreshToken';
import { axiosPrivateInstance } from '../lib/axiosInstance';
import { useEffect } from 'react';
import { useSessionToken } from './useSesstionToken';

export function useAxiosInterseptors() {
  const { handleRefreshToken } = useRefreshToken();

  const sessionToken = useSessionToken();

  useEffect(() => {
    //Will fire before any req
    const requestIntersept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Token']) {
          //if we do not have header Authorization, we will add it
          config.headers['Token'] = `Bearer ${sessionToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntersept = axiosPrivateInstance.interceptors.response.use(
      (response) => response, //will be returned with we do not have errors
      async (error) => {
        //if we have an error, we will try to refresh the token

        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          //403 means that the token is expired | forbidden | prevRequest.sent used to avoid infinite loop
          prevRequest.sent = true;
          const newAccessToken = await handleRefreshToken(); //this hook will add new accessToken to Store

          prevRequest.headers['Token'] = `Bearer ${newAccessToken}`; //add new token to Headers

          return axiosPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.response.eject(responseIntersept); //remove interceptor
      axiosPrivateInstance.interceptors.request.eject(requestIntersept);
    }; //remove interceptor} ]
  }, [sessionToken, handleRefreshToken]);

  return axiosPrivateInstance; //by the time we return the axios instance, the token will be refreshed and set in headers
}
