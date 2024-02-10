import { useRoutes } from 'react-router-dom';
import NotFoundPage from '../components/NotFound/NotFoundPage';
import authApi from '../services/auth.services';
import { useEffect, useState } from 'react';
import LoadingPage from '../components/Loading/LoadingPage';
import { publicRoutes } from './public.routes';
import { protectedRoutes } from './protected.routes';
import storage from '../utils/storage';
import { connectSocket } from '../configs/connectSocket';
import { useAppDispatch } from '../stores/store';

const Routes = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authApi
      .isAuthen()
      .then(res => {
        if (res.status === 200) {
          setIsAuth(res.data.isAuth);
          connectSocket(dispatch);
        }
      })
      .catch(() => {
        setIsAuth(false);
        if (storage.getAccessToken() || storage.getUserId()) {
          storage.clearAccessToken();
          storage.clearUserId();
        }
      });
  }, []);

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...[{ path: '*', element: <NotFoundPage /> }]]);

  if (isAuth === null) {
    return <LoadingPage />;
  }

  return element;
};

export default Routes;
