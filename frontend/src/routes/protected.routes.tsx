import { Navigate } from 'react-router-dom';
import { PATH_HOME, PATH_HOME_LOGIN, PATH_HOME_REGISTER } from './router.path';
import { Suspense } from 'react';
import LoadingPage from '../components/Loading/LoadingPage';
import SharedLayout from '../pages/sharedLayout/SharedLayout';
import Dashboard from '../pages/dashboard/Dashboard';

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
    path: PATH_HOME,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <SharedLayout />
      </Suspense>
    ),
    title: 'Shared',
    children: [
      {
        path: '',
        element: <Dashboard />,
        title: 'Home',
      },
      {
        path: '',
        element: <></>,
        title: 'Blog',
      },
      {
        path: '',
        element: <></>,
        title: 'Contact',
      },
    ],
  },
  {
    path: PATH_HOME_LOGIN,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
  {
    path: PATH_HOME_REGISTER,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
];
