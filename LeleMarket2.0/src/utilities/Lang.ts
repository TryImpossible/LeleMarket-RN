import locales, { LangData, Lang } from '../resources/locales';

const LangManager = {
  lang: 'en',
  ...locales.en,
  register(langData: LangData, lang: Lang) {
    Object.assign(this, langData, { lang });
  },
  get(key: string): string {
    let message = key.split(/\./).reduce((last, current) => last && last[current], this);
    if (!message) {
      message = `Missing ${LangManager.lang}.${key}`;
    }
    return message;
  },
};

export default LangManager;
