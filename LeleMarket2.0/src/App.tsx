import './globals/basics';
import './globals/common';

import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationState, NavigationAction } from 'react-navigation';
import AppNavigator from 'src/navigators/AppNavigator';
import NavigationService from 'src/navigators/NavigationService';
import Window from 'components/common/Window';
import configureStore from 'src/redux/store/configureStore';
import rootSaga from 'src/redux/sagas';

const store = configureStore();
store.runSaga(rootSaga);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
        <AppNavigator
          ref={(nav: any) => {
            // NOTE: ref至少会回调两次，组件装载和组件卸载的时候
            if (!nav) {
              return;
            }
            NavigationService.setTopLevelNavigator(nav);
          }}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onNavigationStateChange={(
            prevState: NavigationState,
            nextState: NavigationState,
            action: NavigationAction,
          ) => {
            if (!nextState.isTransitioning) {
              return;
            }
            console.log('-------------Navigation Params----------');
            // console.log(prevState, nextState, action);
            const route = nextState.routes[nextState.index];
            console.log(`routeName: ${route.routeName}`);
            console.log(`params: ${route.params}`);
            console.log('----------------------------------------');
          }}
        />
        <Window />
      </View>
    </Provider>
  );
};

export default App;
