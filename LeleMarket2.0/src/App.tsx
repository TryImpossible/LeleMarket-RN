import 'react-native-gesture-handler';
import '@utilities/setUp';

import React from 'react';
import { Text, TextInput, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
// import { NavigationState, NavigationAction } from 'react-navigation';
import AppNavigation from '@src/navigators/AppNavigation';
// import NavigationService from '@navigators/NavigationService';
import { RootView } from '@components';
import configureStore from '@src/redux/store/configureStore';
import rootSaga from '@src/redux/sagas';

export const store = configureStore();
store.runSaga(rootSaga);

//关闭字体跟随系统放大
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
  textAlignVertical: 'center',
};
TextInput.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
  textAlignVertical: 'center',
  underlineColorAndroid: 'transparent',
};

YellowBox.ignoreWarnings(['VirtualizedLists should never']);

const App = () => {
  return (
    <Provider store={store}>
      <RootView>
        {/* <AppNavigator
          ref={(nav: any) => {
            // NOTE: ref至少会回调两次，组件装载和组件卸载的时候
            if (!nav) {
              return;
            }
            NavigationService.setTopLevelNavigator(nav);
          }}
          onNavigationStateChange={(
            _prevState: NavigationState,
            nextState: NavigationState,
            _action: NavigationAction,
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
        /> */}
        <AppNavigation />
      </RootView>
    </Provider>
  );
};

export default App;
