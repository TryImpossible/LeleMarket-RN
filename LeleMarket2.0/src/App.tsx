import './utilities/Global';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppNavigator, NavigationService } from './navigators';
import { NavigationState, NavigationAction } from 'react-navigation';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
      <AppNavigator
        ref={(nav: any) => {
          // NOTE: ref至少会回调两次，组件装载和组件卸载的时候
          if (!nav) return;
          NavigationService.setTopLevelNavigator(nav);
        }}
        onNavigationStateChange={(
          prevNavigationState: NavigationState,
          nextNavigationState: NavigationState,
          action: NavigationAction,
        ) => {
          if (!nextNavigationState.isTransitioning) return;
          console.log('-------------Navigation Params----------');
          // console.log(prevNavigationState, nextNavigationState, action);
          const route = nextNavigationState.routes[nextNavigationState.index];
          console.log(`routeName: ${route.routeName}`);
          console.log(`params: ${route.params}`);
          console.log('----------------------------------------');
        }}
      />
    </View>
  );
};

export default App;
