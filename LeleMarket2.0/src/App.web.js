import React from 'react';
import { View, Text } from 'react-native';
import { createNavigator, SwitchRouter, SceneView } from '@react-navigation/core';
import { createBrowserApp, Link } from '@react-navigation/web';
import { createStackNavigator } from 'react-navigation-stack';
window.__DEV__ = true;

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createBrowserApp(createNavigator(AppNavigator));
