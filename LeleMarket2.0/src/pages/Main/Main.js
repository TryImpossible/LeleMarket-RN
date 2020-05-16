import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const routeConfigMap = {
  Home: { screen: () => <Text>Home</Text> },
  Mine: { screen: () => <Text>Mine</Text> },
};

const stackConfig = {
  initialRouteName: 'Home',
  navigationOptions: {
    header: null,
  },
  backBehavior: 'none',
  /* eslint-disable-next-line */
  // tabBarComponent: ({ jumpTo, navigation: { navigate } }) => {},
};

const MainTab = createBottomTabNavigator(routeConfigMap, stackConfig);

class Main extends PureComponent {
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
