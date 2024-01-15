import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './protected.routes';
import { protectedRoutes } from './public.routes';
import NotFoundPage from '../components/NotFound/NotFoundPage';

const Routes = () => {
  const routes = publicRoutes && protectedRoutes;

  const element = useRoutes([
    ...routes,
    ...[{ path: '*', element: <NotFoundPage /> }],
  ]);
  console.log(routes);

  return element;
};

export default Routes;
