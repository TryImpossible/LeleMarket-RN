import { StatusBar, Dimensions, StyleSheet } from 'react-native';
import { __ANDROID__, __IPHONEX__, getSize } from '../utils';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width; // 屏幕宽度
export const SCREEN_HEIGHT = height; // 屏幕高度
/* eslint-disable-next-line */
export const STATUSBAR_HEIGHT = __ANDROID__ ? StatusBar.currentHeight : __IPHONEX__ ? 44 : 20; // 状态栏高度
export const NAVBAR_HEIGHT = getSize(44); // 导航栏高度
export const TABBAR_HEIGHT = getSize(49); // 标签栏高度
export const SAFE_BOTTOM_MARGIN = __IPHONEX__ ? 34 : 0; // 底部安全高度，IphoneX
export const LINE_WIDTH = StyleSheet.hairlineWidth; // 分隔线宽度
