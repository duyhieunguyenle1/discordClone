import { PATH_HOME } from './router.path';

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
    path: PATH_HOME,
    element: <></>,
    title: 'Shared',
    children: [
      {
        path: '',
        element: <></>,
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
    path: '',
    element: <></>,
    title: 'Login',
  },
];
