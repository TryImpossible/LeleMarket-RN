export type Lang = 'en' | 'zh-Hans';

export interface LangData {
  [name: string]: any;
}

declare const locales: { en: LangData; 'zh-Hans': LangData };
export default locales;
