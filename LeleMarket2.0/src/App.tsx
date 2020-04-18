import React from 'react';
import { View, Text, Button, Platform, Dimensions } from 'react-native';
import { createAppContainer, NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';

window.__DEV__ = true;
const isWeb = Platform.OS === 'web';

global.HermesInternal;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height - 64,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Home Screen</Text>
        <Button
          title="前进"
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="后退" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: true,
    },
  },
);

const App = isWeb ? createBrowserApp(AppNavigator) : createAppContainer(AppNavigator);

export default App;
