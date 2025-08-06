import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 10000,
});
export const axiosPrivateInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 10000,
  withCredentials: true,
});
