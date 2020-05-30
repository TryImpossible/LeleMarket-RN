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

// declare module 'slash2';
// declare module '*.css';
// declare module '*.less';
// declare module '*.scss';
// declare module '*.sass';
// declare module '*.svg';
// declare module '*.png';
// declare module '*.jpg';
// declare module '*.jpeg';
// declare module '*.gif';
// declare module '*.bmp';
// declare module '*.tiff';

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="lodash" />

declare interface Window {
  __DEV__: boolean | false;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
  interface Global {
    _: _;
    _toDP: (size: number, enableHeightAdapt: boolean) => number;
    _toSP: (size: number) => number;
    __ANDROID__: boolean;
    __IOS__: boolean;
    __IPHONEX__: boolean;
    __WEB__: boolean;
    __WIDTH__: number;
    __HEIGHT__: number;
    __ONEPX__: number;
    _c: () => string;
    user: { [name: string]: any };
  }
}

declare const _: _;
declare const _toDP: (size: number, enableHeightAdapt?: boolean) => number;
declare const _toSP: (size: number) => number;
declare const __ANDROID__: boolean;
declare const __IOS__: boolean;
declare const __IPHONEX__: boolean;
declare const __WEB__: boolean;
declare const __WIDTH__: number;
declare const __HEIGHT__: number;
declare const __ONEPX__: number;
declare const _c: () => string;
