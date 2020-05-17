/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { DotEnv } from './src/modules';

AppRegistry.registerComponent(appName, () => App);
console.warn('ENV：', DotEnv);
