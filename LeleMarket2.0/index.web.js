/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// 配置react-native-web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app'),
});

console.warn('ENV：', process.env.ENV, typeof process.env.ENV);
