import { jwtDecode } from 'jwt-decode';
import authApi from '../services/auth.services';

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const curTime = Date.now() / 1000;

    return decoded.exp < curTime;
  } catch (error) {
    return true;
  }
};

const newAccessToken = async () => {
  try {
    const response = await authApi.refreshToken();

    const accessToken = response.data.accessToken;
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export { isTokenExpired, newAccessToken };
