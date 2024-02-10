import { FieldValues } from 'react-hook-form';
import axiosPublic from '../configs/axios.public';
import axiosProtected from '../configs/axios.protected';

const authApi = {
  login: async (data: FieldValues) => await axiosPublic.post('/login', data),
  register: async (data: FieldValues) => await axiosPublic.post('/register', data),
  isAuthen: async () => await axiosPublic.get('/isAuthenticated'),
  refreshToken: async () => await axiosPublic.post('/refresh-token'),
  logout: async () => await axiosProtected.post('/auth/logout'),
};

export default authApi;
