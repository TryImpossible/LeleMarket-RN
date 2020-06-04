import _ from 'lodash';
import Theme from './utilities/Theme';
import Lang from './utilities/Lang';

type LODASH = typeof _;
type THEME = typeof Theme;
type LANG = typeof Lang;

declare global {
  interface Window {
    __DEV__: boolean | false;
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly PUBLIC_URL: string;
    }
    interface Global {
      _: LODASH;
      __ANDROID__: boolean;
      __IOS__: boolean;
      __IPHONEX__: boolean;
      __WEB__: boolean;
      __WIDTH__: number;
      __HEIGHT__: number;
      __ONEPX__: number;
      _toDP: (size: number, enableHeightAdapt?: boolean) => number;
      _toSP: (size: number) => number;
      _color: () => string;
      Theme: THEME;
      Lang: LANG;
      user: { [name: string]: any };
    }
  }
  declare const _: LODASH;
  declare const __ANDROID__: boolean;
  declare const __IOS__: boolean;
  declare const __IPHONEX__: boolean;
  declare const __WEB__: boolean;
  declare const __WIDTH__: number;
  declare const __HEIGHT__: number;
  declare const __ONEPX__: number;
  declare const _toDP: (size: number, enableHeightAdapt?: boolean) => number;
  declare const _toSP: (size: number) => number;
  declare const _color: () => string;
  declare const Theme: THEME;
  declare const Lang: LANG;
}
