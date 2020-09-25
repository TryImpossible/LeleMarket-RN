import { NavigationRouteConfigMap, NavigationRoute } from 'react-navigation';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack/src/types';
import { Splash, Main } from '@screens';

const RouteConfigMap: NavigationRouteConfigMap<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = {
  Splash,
  Main,
};

export default RouteConfigMap;
