import { Animated, Easing } from 'react-native';
import { CreateNavigatorConfig, NavigationStackRouterConfig, NavigationRoute } from 'react-navigation';
import {
  SceneInterpolatorProps,
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack/src/types';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import { NAVBAR_HEIGHT, STATUSBAR_HEIGHT, PRIMARY_COLOR } from '../utilities/Constants';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps: SceneInterpolatorProps) => {
    const {
      scene: { route },
    } = sceneProps;
    const params = route.params || {};
    const transition:
      | 'forHorizontal'
      | 'forVertical'
      | 'forFadeFromBottomAndroid'
      | 'forFadeToBottomAndroid'
      | 'forFade'
      | 'forNoAnimation' = params.transition;
    if (transition) {
      return StackViewStyleInterpolator[transition](sceneProps);
    } else {
      if (__ANDROID__) {
        return StackViewStyleInterpolator.forFadeFromBottomAndroid(sceneProps);
      } else if (__IOS__) {
        return StackViewStyleInterpolator.forHorizontal(sceneProps);
      } else {
        return StackViewStyleInterpolator.forNoAnimation();
      }
    }
  },
  // screenInterpolator: (sceneProps) => {
  //   const { layout, position, scene } = sceneProps;
  //   const { index } = scene;
  //   const width = layout.initWidth;
  //   let translateX = position.interpolate({
  //     inputRange: [index - 1, index, index + 1],
  //     outputRange: [width, 0, 0],
  //   });
  //   // 需要移除过场动画的路由名
  //   const ignoreTransitionRouteNames = ['Main'];
  //   // 移除过场动画，优化体检
  //   if (ignoreTransitionRouteNames.includes(scene.route.routeName)) {
  //     translateX = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [0, 0, 0],
  //     });
  //   }
  //   const opacity = position.interpolate({
  //     inputRange: [index - 1, index - 0.99, index],
  //     outputRange: [0, 1, 1],
  //   });
  //   return {
  //     opacity,
  //     transform: [{ translateX }],
  //   };
  // },
});

const StackConfig: CreateNavigatorConfig<
  NavigationStackConfig,
  NavigationStackRouterConfig,
  NavigationStackOptions,
  NavigationStackProp<NavigationRoute, any>
> = {
  initialRouteName: 'Splash',
  headerMode: 'screen',
  defaultNavigationOptions: {
    gesturesEnabled: __IOS__,
    title: 'LeleMarket',
    header: null,
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
      paddingTop: STATUSBAR_HEIGHT,
      height: __ANDROID__ ? NAVBAR_HEIGHT + STATUSBAR_HEIGHT : NAVBAR_HEIGHT,
    },
    headerTitleStyle: {
      color: PRIMARY_COLOR,
    },
  },
  // onTransitionStart: (transitionProps, prevTransitionProps) => {
  //   console.log(transitionProps, prevTransitionProps);
  // },
  transitionConfig,
};

export default StackConfig;
