declare module '@react-navigation/web' {
  import { NavigationContainer } from 'react-navigation';
  interface BrowserAppOptions {
    history: Object;
  }
  export function createBrowserApp<Options, NavigationPropType>(
    component: NavigationNavigator<Options, NavigationPropType>,
    options?: BrowserAppOptions,
  ): NavigationContainer;

  export const Link: React.ReactNode;

  interface HandleServerRequestResult {
    navigation: obj;
    title: string;
    options: obj;
  }
  export function handleServerRequest(Router: any, pathWithLeadingSlash: any, query: any): HandleServerRequestResult;
}

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// declare interface Window {
//   __DEV__: boolean | false;
// }

// declare namespace NodeJS {
//   interface ProcessEnv {
//     readonly NODE_ENV: 'development' | 'production' | 'test';
//     readonly PUBLIC_URL: string;
//   }
//   interface Global {
//     _: _;
//     __ANDROID__: boolean;
//     __IOS__: boolean;
//     __IPHONEX__: boolean;
//     __WEB__: boolean;
//     __WIDTH__: number;
//     __HEIGHT__: number;
//     __ONEPX__: number;
//     _toDP: (size: number, enableHeightAdapt?: boolean) => number;
//     _toSP: (size: number) => number;
//     _color: () => string;
//     user: { [name: string]: any };
//   }
// }

// declare const _: _;
// declare const __ANDROID__: boolean;
// declare const __IOS__: boolean;
// declare const __IPHONEX__: boolean;
// declare const __WEB__: boolean;
// declare const __WIDTH__: number;
// declare const __HEIGHT__: number;
// declare const __ONEPX__: number;
// declare const _toDP: (size: number, enableHeightAdapt?: boolean) => number;
// declare const _toSP: (size: number) => number;
// declare const _color: () => string;
