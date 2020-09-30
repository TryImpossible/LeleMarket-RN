import React from 'react';
import {
  CommonActions,
  StackActions,
  NavigationContainerRef,
  Route,
  NavigationState,
  PartialState,
  InitialState,
} from '@react-navigation/native';

export const isReadyRef = React.createRef<boolean>();

export const navigationRef = React.createRef<NavigationContainerRef>();

const validateNavigation = () => {
  if (isReadyRef.current && navigationRef.current) {
    return true;
  }
  throw Error('navigation is undefined, maybe not setup');
};

export const getRoutes = () => {
  validateNavigation();
  return navigationRef.current?.getRootState().routes || [];
};

export const getIndex = () => {
  validateNavigation();
  return navigationRef.current?.getRootState().index;
};

export const getCurrentRoute = (): Route<string> | undefined => {
  validateNavigation();
  return navigationRef.current?.getCurrentRoute();
};

export const navigate = (routeName: string, params?: object) => {
  validateNavigation();
  const action = CommonActions.navigate({ name: routeName, params });
  navigationRef.current?.dispatch(action);
};

export const goBack = (routeName: string | undefined = undefined) => {
  validateNavigation();
  let action = null;
  if (routeName) {
    let routes = null;
    try {
      routes = getRoutes();
    } catch (err) {
      throw Error(`Can't go back to "${routeName}", no routes`);
    }
    const index = routes.findIndex(
      (
        route: Route<string> & {
          state?: NavigationState | PartialState<NavigationState>;
        },
      ) => route.name === routeName,
    );
    // NOTE: key不是目标页面的key,而是可以在key为undefined时goBack到目标页面的那个页面的key. 如果key为null, 那么会回到任何地方.
    const screenRoute = routes[index + 1];
    if (!(screenRoute && screenRoute.key)) {
      throw Error(`Can't go back to "${routeName}"`);
    }
    action = { ...CommonActions.goBack(), source: screenRoute?.key, target: screenRoute?.params?.key };
  } else {
    action = CommonActions.goBack();
  }
  navigationRef.current?.dispatch(action);
};

export const reset = (
  index: number,
  routes: (Omit<Route<string>, 'key'> & {
    key?: string;
    state?: InitialState;
  })[],
) => {
  validateNavigation();
  const action = CommonActions.reset({
    index,
    routes,
  });
  navigationRef.current?.dispatch(action);
};

export const resetTo = (routeName: string, params?: object) => reset(0, [{ name: routeName, params }]);

export const resetRoot = (routeName: string) => {
  validateNavigation();
  navigationRef.current?.resetRoot({ index: 0, routes: [{ name: routeName }] });
};

export const replace = (routeName: string, params?: object | undefined) => {
  validateNavigation();
  const action = StackActions.replace(routeName, params);
  navigationRef.current?.dispatch(action);
};

export const push = (routeName: string, params?: object | undefined) => {
  validateNavigation();
  const action = StackActions.push(routeName, params);
  navigationRef.current?.dispatch(action);
};

export const pop = (n: number = 1): void => {
  validateNavigation();
  const action = StackActions.pop(n);
  navigationRef.current?.dispatch(action);
};

export const popToTop = (): void => {
  validateNavigation();
  const action = StackActions.popToTop();
  navigationRef.current?.dispatch(action);
};
