import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { NavigationBottomTabOptions, NavigationTabProp, createBottomTabNavigator } from 'react-navigation-tabs';
import { BottomTabBarOptions } from 'react-navigation-tabs/lib/typescript/src/types';
import {
  NavigationRouteConfigMap,
  NavigationRoute,
  NavigationParams,
  NavigationProp,
  NavigationState,
  CreateNavigatorConfig,
  NavigationTabRouterConfig,
} from 'react-navigation';

const routeConfigMap: NavigationRouteConfigMap<
  NavigationBottomTabOptions,
  NavigationTabProp<NavigationRoute<NavigationParams>, any>,
  unknown
> = {
  Home: { screen: () => <Text>Home</Text> },
  Mine: { screen: () => <Text>Mine</Text> },
};

interface Config {
  lazy?: boolean;
  tabBarComponent?: React.ComponentType<any>;
  tabBarOptions?: BottomTabBarOptions;
}

const stackConfig: CreateNavigatorConfig<
  Partial<Config>,
  NavigationTabRouterConfig,
  Partial<NavigationBottomTabOptions>,
  NavigationTabProp<NavigationRoute<NavigationParams>, any>
> = {
  initialRouteName: 'Home',
  navigationOptions: {
    header: null,
  },
  backBehavior: 'none',
  // tabBarComponent: ({ jumpTo, navigation: { navigate } }) => {},
};

const MainTab = createBottomTabNavigator(routeConfigMap, stackConfig);

interface Props {
  navigation: NavigationProp<NavigationState>;
}
class Main extends PureComponent<Props> {
  static router = MainTab.router;

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MainTab navigation={navigation} screenProps={{}} />
      </View>
    );
  }
}

export default Main;
