import './globals/basics';
import './globals/common';

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationState, NavigationAction } from 'react-navigation';
import AppNavigator from 'src/navigators/AppNavigator';
import NavigationService from 'src/navigators/NavigationService';
import Window from 'components/common/Window';
import configureStore from 'src/redux/store/configureStore';
import rootSaga from 'src/redux/sagas';

export const store = configureStore();
store.runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Window>
        <AppNavigator
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
        />
      </Window>
    </Provider>
  );
};

export default App;
