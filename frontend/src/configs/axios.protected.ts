import axios from 'axios';
import storage from '../utils/storage';
import { isTokenExpired, newAccessToken } from '../utils/token';
import { toast } from 'react-toastify';
import { ExtendedRequest } from '../types/auth.types';

const DOMAIN_API = import.meta.env.VITE_DOMAIN_API;

const axiosProtected = axios.create({
  baseURL: `${DOMAIN_API}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosProtected.interceptors.request.use(
  async (req: ExtendedRequest) => {
    const accessToken = storage.getAccessToken();

    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      const newToken = await newAccessToken();
      storage.setAccessToken(newToken);
      req.headers['Authorization'] = `Bearer ${newToken}`;
    }

    const userId = storage.getUserId();

    if (!userId) {
      toast.error(`Please login again`);
      return Promise.reject();
    }

    return req;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  },
);

axiosProtected.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response) {
      toast.error(`${err.response.data.msg}`);
    }
    return Promise.reject(err);
  },
);

export default axiosProtected;
