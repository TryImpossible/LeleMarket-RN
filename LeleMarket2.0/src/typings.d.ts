declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// declare const global: { HermesInternal: null | {} };

declare const SERVER_URL: string;

interface Window {
  __DEV__: boolean | false;
  SERVER_URL: String;
}

declare namespace NodeJS {
  interface Global {
    HermesInternal: null | {};
  }
}
