import React, { PureComponent } from 'react';
import { View } from 'react-native';
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
import { MainTabBar } from '@components';
import IMAGES from '@resources/images';
import Home from '../Home';
import Discover from './Discover';
import Customization from './Customization';
import ShoppingCart from './ShoppingCart';
import Mine from './Mine';

const routeConfigMap: NavigationRouteConfigMap<
  NavigationBottomTabOptions,
  NavigationTabProp<NavigationRoute<NavigationParams>, any>,
  unknown
> = {
  Home,
  Discover,
  Customization,
  ShoppingCart,
  Mine,
};

interface Config {
  lazy?: boolean;
  tabBarComponent?: React.ComponentType<any>;
  tabBarOptions?: BottomTabBarOptions;
}

const mainTabBarData = [
  {
    icon: IMAGES.ic_mainTabBar_home_normal,
    selectedIcon: IMAGES.ic_mainTabBar_home_selected,
    text: Lang.get('components.mainTabBar.home'),
  },
  {
    icon: IMAGES.ic_mainTabBar_discover_normal,
    selectedIcon: IMAGES.ic_mainTabBar_discover_selected,
    text: Lang.get('components.mainTabBar.discover'),
  },
  {
    icon: IMAGES.ic_mainTabBar_customization_normal,
    selectedIcon: IMAGES.ic_mainTabBar_customization_selected,
    text: Lang.get('components.mainTabBar.customization'),
  },
  {
    icon: IMAGES.ic_mainTabBar_shopping_cart_normal,
    selectedIcon: IMAGES.ic_mainTabBar_shopping_cart_selected,
    text: Lang.get('components.mainTabBar.shoppingCart'),
  },
  {
    icon: IMAGES.ic_mainTabBar_mine_normal,
    selectedIcon: IMAGES.ic_mainTabBar_mine_selected,
    text: Lang.get('components.mainTabBar.mine'),
  },
];

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
  lazy: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tabBarComponent: ({ jumpTo, navigation: { navigate } }) => {
    return (
      <MainTabBar
        data={mainTabBarData}
        tabBarOnPress={(index) => {
          jumpTo(Object.keys(routeConfigMap)[index]);
        }}
      />
    );
    // return (
    //   <MainTabBar>
    //     <MainTabBar.NormalItem
    //       icon={IMAGES.ic_mainTabBar_home_normal}
    //       selectedIcon={IMAGES.ic_mainTabBar_home_selected}
    //       text={Lang.get('components.mainTabBar.home')}
    //       onPress={() => {}}
    //     />
    //     <MainTabBar.NormalItem
    //       icon={IMAGES.ic_mainTabBar_home_normal}
    //       selectedIcon={IMAGES.ic_mainTabBar_home_selected}
    //       text={Lang.get('components.mainTabBar.discover')}
    //       onPress={() => {}}
    //     />
    //   </MainTabBar>
    // );
  },
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
