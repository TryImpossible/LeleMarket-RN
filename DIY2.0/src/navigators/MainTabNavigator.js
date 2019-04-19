import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Home, Mine } from '../screens/index';
import { TabBar } from '../components';

const MainTabNavigator = createBottomTabNavigator(
  {
    Home,
    Mine
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: props => {
      console.log(props); // eslint-disable-line
      return <TabBar />;
    }
  }
);

export default createAppContainer(MainTabNavigator);
