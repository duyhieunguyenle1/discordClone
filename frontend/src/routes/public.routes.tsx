import { LoginPage, RegisterPage } from '../pages';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import ResetPasswordPage from '../pages/auth/ResetPassword';
import VerifyEmailPage from '../pages/auth/VerifyEmail';
import {
  PATH_HOME_FORGOT_PASSWORD,
  PATH_HOME_LOGIN,
  PATH_HOME_REGISTER,
  PATH_HOME_RESET_PASSWORD,
  PATH_HOME_VERIFY_EMAIL,
} from './router.path';
import { Navigate } from 'react-router-dom';

interface routeType {
  path: string;
  title: string;
  element: JSX.Element;
}

type fullRouteType = routeType & {
  children?: routeType[];
};

export const publicRoutes: fullRouteType[] = [
  {
    path: PATH_HOME_LOGIN,
    element: <LoginPage />,
    title: 'Login',
  },
  {
    path: PATH_HOME_REGISTER,
    element: <RegisterPage />,
    title: 'Register',
  },
  {
    path: PATH_HOME_VERIFY_EMAIL,
    element: <VerifyEmailPage />,
    title: 'Verify Email',
  },
  {
    path: PATH_HOME_FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
    title: 'Forgot password',
  },
  {
    path: PATH_HOME_RESET_PASSWORD,
    element: <ResetPasswordPage />,
    title: 'Reset password',
  },
  {
    path: '*',
    element: <Navigate to={'/login'} />,
    title: 'Redirect',
  },
];
