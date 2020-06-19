import {
  NavigationContainer,
  NavigationProp,
  NavigationState,
  NavigationRoute,
  NavigationActions,
  StackActions,
  NavigationParams,
  NavigationNavigateAction,
} from 'react-navigation';

export type AppNavigatorRef = NavigationContainer & NavigationProp<NavigationState>;

let topLevelNavigator: AppNavigatorRef;

const getTopLevelNavigator = (): NavigationContainer & NavigationProp<NavigationState> => {
  if (!topLevelNavigator) {
    throw Error('topLevelNavigator is undefined, maybe not initialize');
  }
  return topLevelNavigator;
};

const setTopLevelNavigator = (navigatorRef: NavigationContainer & NavigationProp<NavigationState>) => {
  topLevelNavigator = navigatorRef;
};

const getRoutes = () => {
  const state: any = getTopLevelNavigator().state;
  if (!state) {
    throw Error('internal error, it should not appear');
  }
  return state.nav.routes;
};

const getIndex = () => {
  const state: any = getTopLevelNavigator().state;
  if (!state) {
    throw Error('internal error, it should not appear');
  }
  return state.nav.index;
};

const navigate = (routeName: string, params?: NavigationParams) => {
  const options = NavigationActions.navigate({
    routeName,
    params,
  });
  getTopLevelNavigator().dispatch(options);
};

const goBack = (routeName: string | undefined = undefined) => {
  let action = null;
  if (routeName) {
    let routes;
    try {
      routes = getRoutes();
    } catch (err) {
      throw Error(`Can't go back to "${routeName}", no routes`);
    }

    const index = routes.findIndex((route: NavigationRoute) => route.routeName === routeName);
    // NOTE: key不是目标页面的key,而是可以在key为undefined时goBack到目标页面的那个页面的key. 如果key为null, 那么会回到任何地方.
    const screenRoute = routes[index + 1];
    if (!(screenRoute && screenRoute.key)) {
      throw Error(`Can't go back to "${routeName}"`);
    }
    action = NavigationActions.back({
      key: screenRoute.key,
    });
  } else {
    action = NavigationActions.back();
  }
  getTopLevelNavigator().dispatch(action);
};

const reset = (index: number, actions: NavigationNavigateAction[]) => {
  const action = StackActions.reset({
    index,
    actions,
  });
  getTopLevelNavigator().dispatch(action);
};

const resetTo = (routeName: string, params?: NavigationParams) =>
  reset(0, [NavigationActions.navigate({ routeName, params })]);

const replace = (routeName: string, params?: NavigationParams) => {
  const action = StackActions.replace({
    routeName,
    params,
  });
  getTopLevelNavigator().dispatch(action);
};

const push = (routeName: string, params?: NavigationParams) => {
  const action = StackActions.push({
    routeName,
    params,
  });
  getTopLevelNavigator().dispatch(action);
};

const pop = (n: number = 1): void => {
  const action = StackActions.pop({ n });
  getTopLevelNavigator().dispatch(action);
};

const popToTop = (): void => {
  const action = StackActions.popToTop();
  getTopLevelNavigator().dispatch(action);
};

export default {
  getTopLevelNavigator,
  setTopLevelNavigator,
  getRoutes,
  getIndex,
  navigate,
  goBack,
  reset,
  resetTo,
  replace,
  push,
  pop,
  popToTop,
};
