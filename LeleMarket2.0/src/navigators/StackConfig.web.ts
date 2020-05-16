import { Animated, Easing } from 'react-native';
import { CreateNavigatorConfig, NavigationStackRouterConfig, NavigationRoute } from 'react-navigation';
import {
  SceneInterpolatorProps,
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack/src/types';

import { NAVBAR_HEIGHT, STATUSBAR_HEIGHT, PRIMARY_COLOR } from '../utilities/Constants';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 260,
    easing: Easing.bezier(0.27, 0.58, 0.38, 1),
    timing: Animated.spring,
    // spring config (ps: View /node_modules/react-navigation/src/views/Transitioner.js)
    velocity: 1.5, // Velocity makes it move
    tension: 200, // Slow
    friction: 26, // Oscillate a lot
    useNativeDriver: true, // RN 0.43
  },
  // Define scene interpolation, eq. custom transition
  screenInterpolator: (sceneProps: SceneInterpolatorProps) => {
    // part-1: prepare for some params
    const { position, scene, layout } = sceneProps;
    const { index } = scene;
    const { initWidth } = layout;
    // part-2: define transition animation
    // opacity
    const opacity = position.interpolate({
      inputRange: [index - 1, index, index + 0.99, index + 1],
      outputRange: [1, 1, 0.4, 0],
    });
    // scale
    const scale = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1, 1, 0.95],
    });
    // transX
    const _width = Math.round(initWidth * 0.3);
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [initWidth, 0, -_width],
    });
    // part-3 return
    return {
      opacity,
      transform: [{ scale }, { translateX }],
    };
  },
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
