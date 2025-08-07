import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 60 * 2000, // 120 seconds
  timeoutErrorMessage:
    'The server is taking too long to respond, please try to reload the page or contact us if the problem persists',
});
export const axiosPrivateInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 60 * 2000, // 120 seconds
  // withCredentials: true,
  timeoutErrorMessage:
    'The server is taking too long to respond, please try to reload the page or contact us if the problem persists',
});
