import { RouteObject, matchRoutes, useLocation } from 'react-router-dom';

const useMatchedPath = (routes: RouteObject[]) => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);

  // Check if any route is matched before accessing its path
  if (matchedRoutes) {
    const [{ route }] = matchedRoutes;

    return route.path;
  }
  return null;
};

export default useMatchedPath;
