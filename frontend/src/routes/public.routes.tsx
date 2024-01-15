import RegisterPage from '../pages/auth/Register';
import LoginPage from '../pages/auth/Login';
import {
  PATH_HOME_LOGIN,
  PATH_HOME_REGISTER,
} from './router.path';

interface routeType {
  path: string;
  title: string;
  element: JSX.Element;
}

type fullRouteType = routeType & {
  children?: routeType[];
};

export const protectedRoutes: fullRouteType[] = [
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
];
