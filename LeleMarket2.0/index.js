/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// 配置react-native-web
if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app'),
  });
}
