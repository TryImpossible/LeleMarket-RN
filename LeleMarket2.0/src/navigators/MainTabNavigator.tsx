import React from 'react';
import { Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Discover, Customization, ShoppingCart, Mine } from '@screens';

import IMAGES from '@resources/images';

const mainTabData = [
  {
    name: 'Home',
    component: Home,
    icon: IMAGES.ic_mainTabBar_home_normal,
    selectedIcon: IMAGES.ic_mainTabBar_home_selected,
    title: Lang.get('components.mainTabBar.home'),
  },
  {
    name: 'Discover',
    component: Discover,
    icon: IMAGES.ic_mainTabBar_discover_normal,
    selectedIcon: IMAGES.ic_mainTabBar_discover_selected,
    title: Lang.get('components.mainTabBar.discover'),
  },
  {
    name: 'Customization',
    component: Customization,
    icon: IMAGES.ic_mainTabBar_customization_normal,
    selectedIcon: IMAGES.ic_mainTabBar_customization_selected,
    title: Lang.get('components.mainTabBar.customization'),
  },
  {
    name: 'ShoppingCart',
    component: ShoppingCart,
    icon: IMAGES.ic_mainTabBar_shopping_cart_normal,
    selectedIcon: IMAGES.ic_mainTabBar_shopping_cart_selected,
    title: Lang.get('components.mainTabBar.shoppingCart'),
  },
  {
    name: 'Mine',
    component: Mine,
    icon: IMAGES.ic_mainTabBar_mine_normal,
    selectedIcon: IMAGES.ic_mainTabBar_mine_selected,
    title: Lang.get('components.mainTabBar.mine'),
  },
];

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Customization: undefined;
  ShoppingCart: undefined;
  Mine: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
        inactiveTintColor: Colors.textLightColor,
        labelStyle: { fontSize: toSP(Dimens.textSmallSize) },
        style: { borderTopColor: Colors.dividerColor, borderTopWidth: Dimens.dividerHeight },
      }}
    >
      {mainTabData.map(({ name, component, title, icon, selectedIcon }, index) => (
        <MainTab.Screen
          key={String(index)}
          name={name as keyof MainTabParamList}
          component={component}
          options={{
            title,
            tabBarIcon: ({ focused }) => {
              let scaleValue;
              if (focused) {
                scaleValue = new Animated.Value(0.85);
                Animated.timing(scaleValue, {
                  toValue: 1,
                  easing: Easing.elastic(5),
                  useNativeDriver: false,
                }).start();
              } else {
                scaleValue = new Animated.Value(1);
              }
              return (
                <Animated.Image
                  source={!focused ? icon : selectedIcon}
                  style={[{ width: toDP(24), height: toDP(24), transform: [{ scale: scaleValue }] }]}
                  resizeMode="contain"
                />
              );
            },
            // tabBarBadge: 10,
          }}
        />
      ))}
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
