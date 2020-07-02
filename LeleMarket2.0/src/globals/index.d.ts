import _ from 'lodash';
import ThemeManager, { Styles, Colors, Dimens } from 'resources/themes';
import LangManager from 'resources/locales';

type LODASH = typeof _;
type THEME = typeof ThemeManager;
type LANG = typeof LangManager;

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
      toDP: (size: number, enableHeightAdapt?: boolean) => number;
      toSP: (size: number) => number;
      color: () => string;
      Theme: THEME;
      Styles: Styles;
      Colors: Colors;
      Dimens: Dimens;
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
  declare const toDP: (size: number, enableHeightAdapt?: boolean) => number;
  declare const toSP: (size: number) => number;
  declare const color: () => string;
  declare const Theme: THEME;
  declare const Styles: Styles;
  declare const Colors: Colors;
  declare const Dimens: Dimens;
  declare const Lang: LANG;
}
