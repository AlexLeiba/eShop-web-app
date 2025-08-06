import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 10000,
  timeoutErrorMessage:
    'The server is taking too long to respond, please contact us if the problem persists',
});
export const axiosPrivateInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 10000,
  withCredentials: true,
});
