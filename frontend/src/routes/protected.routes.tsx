import { Navigate } from 'react-router-dom';
import {
  PATH_CHAT,
  PATH_HOME,
  PATH_HOME_FORGOT_PASSWORD,
  PATH_HOME_LOGIN,
  PATH_HOME_REGISTER,
  PATH_HOME_RESET_PASSWORD,
  PATH_HOME_VERIFY_EMAIL,
  PATH_SERVER,
  PATH_SERVER_CHANNEL,
} from './router.path';
import { Suspense, lazy } from 'react';
import LoadingPage from '../components/Loading/LoadingPage';
import { ChatChannelPage, ChatPage, DashboardPage, ServerCommonPage, ServerPage } from '../pages';

const SharedLayout = lazy(() => import('../pages/sharedLayout/SharedLayout'));

interface routeType {
  path: string;
  title: string;
  element: JSX.Element;
  children?: routeType[];
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
        element: <DashboardPage />,
        title: 'Home',
      },
      {
        path: PATH_CHAT,
        element: <ChatPage />,
        title: 'Chat Details',
      },
      {
        path: PATH_SERVER,
        element: <ServerPage />,
        title: 'Server Details',
        children: [
          {
            path: '',
            element: <ServerCommonPage />,
            title: 'Server Page Common',
          },
          {
            path: PATH_SERVER_CHANNEL,
            element: <ChatChannelPage />,
            title: 'Server Channel',
          },
        ],
      },
    ],
  },
  {
    path: PATH_HOME_LOGIN,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
  {
    path: PATH_HOME_VERIFY_EMAIL,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
  {
    path: PATH_HOME_FORGOT_PASSWORD,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
  {
    path: PATH_HOME_RESET_PASSWORD,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
  {
    path: PATH_HOME_REGISTER,
    element: <Navigate to={PATH_HOME} />, //redirect to home page if already login
    title: 'Redirect to home',
  },
];
