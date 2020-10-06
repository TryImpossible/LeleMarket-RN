/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  TransitionPresets,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import { Splash } from '@screens';
import MainTabNavigator from './MainTabNavigator';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      headerMode="float"
      screenOptions={{
        cardOverlayEnabled: true,
        cardStyle: {},
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          paddingTop: Dimens.statusBarHeight,
          height: __ANDROID__ ? Dimens.navBarHeight + Dimens.statusBarHeight : Dimens.navBarHeight,
        },
      }}
    >
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
          // transitionSpec: {
          //   open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          //   close: TransitionSpecs.FadeInFromBottomAndroidSpec,
          // },
          // headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          // ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <RootStack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          headerShown: false,
          // transitionSpec: {
          //   open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          //   close: TransitionSpecs.FadeInFromBottomAndroidSpec,
          // },
          // headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
