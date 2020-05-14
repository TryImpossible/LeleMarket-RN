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

// declare const global: { HermesInternal: null | {} };

// declare const SERVER_URL: string;

// interface Window {
//   __DEV__: boolean | false;
//   SERVER_URL: String;
// }

// declare namespace NodeJS {
//   interface Global {
//     HermesInternal: null | {};
//   }
// }

/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface Window {
  __DEV__: boolean | false;
  SERVER_URL: String;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
  interface Global {
    HermesInternal: null | {};
  }
}

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

declare module '@react-navigation/web' {
  export function createBrowserApp(): void;
}
