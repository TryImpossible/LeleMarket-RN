import en from './en';
import zhHans from './zh-Hans';

export type Lang = 'en' | 'zh-Hans' | string;

export type LangData = typeof en;

interface Locales {
  en: LangData;
  'zh-Hans': LangData;
  [name: string]: LangData;
}

const locales: Locales = {
  en, // 英文
  'zh-Hans': zhHans, // 简体中文,
  // 'en-US': en,
  // 'en-CN': en,
  // 'zh-CN': zhHans,
  // 'zh-HK': zhHant,
  // 'zh-TW': zhHant,
  // 'zh-Hans-CN': zhHans, // 大陆地区使用的简体中文
  // 'zh-Hans-HK': zhHans, // 香港地区使用的简体中文
  // 'zh-Hans-MO': zhHans, // 澳门使用的简体中文
  // 'zh-Hans-SG': zhHans, // 新加坡使用的简体中文
  // 'zh-Hans-TW': zhHans, // 台湾使用的简体中文
  // 'zh-Hant': zhHant, // 繁体中文
  // 'zh-Hant-CN': zhHant, // 大陆地区使用的繁体中文
  // 'zh-Hant-HK': zhHant, // 香港地区使用的繁体中文
  // 'zh-Hant-MO': zhHant, // 澳门使用的繁体中文
  // 'zh-Hant-SG': zhHant, // 新加坡使用的繁体中文
  // 'zh-Hant-TW': zhHant // 台湾使用的繁体中文
};

const LangManager = {
  lang: 'en',
  ...locales.en,
  register(langData: LangData, lang: Lang) {
    Object.assign(this, langData, { lang });
  },
  get(key: string): string {
    let message = key.split(/\./).reduce((last: any, current) => last && last[current], this);
    if (!message) {
      message = `Missing ${LangManager.lang}.${key}`;
    }
    return message;
  },
};

export default LangManager;

export { locales };
