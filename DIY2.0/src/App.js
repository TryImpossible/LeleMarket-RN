import React from 'react';
import RootStackNavigator from './navigators';
import { __ANDROID__ } from './utils';

export default class App extends React.PureComponent {
  componentDidMount() {
    // console.warn(RootStackNavigator.router);
    // // 动态加载
    // import('../src/utils/DateUtil').then(module => {
    //   console.log('module', module);
    //   const constants = module.default;
    //   console.log('formate', constants.formate());
    // });
  }

  render() {
    return (
      <RootStackNavigator
        ref={ref => {
          this.navigator = ref;
        }}
        uriPrefix={__ANDROID__ ? 'diy://diy/' : 'diy://'} // 配置Web访问App的URL Schema
        // onNavigationStateChange={(prevState, currentState, action) => {
        //   console.log(prevState);
        //   console.log(currentState);
        //   console.log(action);
        // }}
      />
    );
  }
}
