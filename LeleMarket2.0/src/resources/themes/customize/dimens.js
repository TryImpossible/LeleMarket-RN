import { StatusBar } from 'react-native';

export const fontSizeHeadline = 17;
export const fontSizeSubheading = 15;
export const fontSizeTitle = 15;
export const fontSizeBody = 12;
export const fontSizeCaption = 12;
export const fontSizeButton = 15;
export const fontSizeHint = 12;

/* eslint-disable-next-line */
export const heightStatusBar = __ANDROID__ ? StatusBar.currentHeight || 24 : __IPHONEX__ ? 44 : 20;
export const heightNavBar = 44;
export const heightTabBar = 54;
export const heightSafeBottom = __IPHONEX__ ? 34 : 0;
export const onePX = __ONEPX__;

export const activeOpacity = 0.6;

export const paddingHeader = 12;
