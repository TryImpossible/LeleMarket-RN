import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Main } from '../screens';

const stackConfig = {
  headerMode: 'none',
  navigationOptions: {
    header: null,
    gesturesEnabled: true
  }
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 300,
  //     easing: Easing.out(Easing.poly(4)),
  //     timing: Animated.timing
  //   },
  //   screenInterpolator: sceneProps => {
  //     const { layout, position, scene } = sceneProps;
  //     const { index } = scene;

  //     const height = layout.initHeight;
  //     const translateY = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [height, 0, 0]
  //     });

  //     const opacity = position.interpolate({
  //       inputRange: [index - 1, index - 0.99, index],
  //       outputRange: [0, 1, 1]
  //     });

  //     return { opacity, transform: [{ translateY }] };
  //   }
  // }),
  // onTransitionStart: (transitionProps, prevTransitionProps) => {},
  // onTransitionEnd: (transitionProps, prevTransitionProps) => {}
};

const RootStackNavigator = createStackNavigator(
  {
    Main
  },
  {
    ...stackConfig,
    initialRouteName: 'Main'
  }
);

export default createAppContainer(RootStackNavigator);
