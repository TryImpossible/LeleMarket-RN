export type Lang = 'en' | 'zh-Hans';

export type LangData = object;

declare const locales: { en: LangData; 'zh-Hans': LangData };
export default locales;
