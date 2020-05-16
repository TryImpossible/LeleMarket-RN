import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';

import RouteConfigMap from './RouteConfigMap';
import StackConfig from './StackConfig';

const RootStackNavigator = createStackNavigator(RouteConfigMap, StackConfig);

// const defaultGetStateForAction = RootStackNavigator.router.getStateForAction;

// RootStackNavigator.router.getStateForAction = (action, state) => {
//   if (state && action.type === NavigationActions.BACK && state.routes[state.index].routeName === 'Chatting') {
//     return null;
//   }
//   return defaultGetStateForAction(action, state);
// };

// // handle double click
// const navigateOnce = (getStateForAction) => (action, lastState) => {
//   const { type, routeName, params } = action;
//   return lastState &&
//   type === NavigationActions.NAVIGATE && // 此处原先使用NavigationActions.NAVIGATE
//     routeName === lastState.routes[lastState.routes.length - 1].routeName &&
//     JSON.stringify(params) === JSON.stringify(lastState.routes[lastState.routes.length - 1].params)
//     ? null
//     : getStateForAction(action, lastState);
// };

// RootStackNavigator.router.getStateForAction = navigateOnce(RootStackNavigator.router.getStateForAction);

const AppNavigator = __WEB__
  ? createBrowserApp(RootStackNavigator, { history: 'hash' }) // history, String types: "hash", "memory", "browser", defaults to: "browser"
  : createAppContainer(RootStackNavigator);

export default AppNavigator;

// const MyRouter = {
//   getStateForAction: (action, state) => ({}),
//   getActionForPathAndParams: (path, params) => null,
//   getPathAndParamsForState: (state) => null,
//   getComponentForState: (state) => MyScreen,
//   getComponentForRouteName: (routeName) => MyScreen,
// };

// // Now, you can make a navigator by putting the router on it:
// class MyNavigator extends React.Component {
//   static router = MyRouter;
//   render() {
//   }
// }
