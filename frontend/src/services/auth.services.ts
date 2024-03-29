import { FieldValues } from 'react-hook-form';
import axiosPublic from '../configs/axios.public';
import axiosProtected from '../configs/axios.protected';

const authApi = {
  login: async (data: FieldValues) => await axiosPublic.post('/login', data),
  register: async (data: FieldValues) => await axiosPublic.post('/register', data),
  isAuthen: async () => await axiosPublic.get('/isAuthenticated'),
  refreshToken: async () => await axiosPublic.post('/refresh-token'),
  logout: async () => await axiosProtected.post('/auth/logout'),
  sendOtp: async (emailQuery: string, email: string) =>
    await axiosPublic.post(`/send-otp?e=${emailQuery}`, { email }),
  verifyOtp: async (otp: string, email: string) =>
    await axiosPublic.post(`/verify-otp?e=${email}`, { otp }),
  forgotPassword: async (data: FieldValues) => await axiosPublic.post('/forgot', data),
  resetPassword: async (data: FieldValues, token: string, email: string) =>
    await axiosPublic.put(`/reset-password?token=${token}&e=${email}`, data),
};

export default authApi;
