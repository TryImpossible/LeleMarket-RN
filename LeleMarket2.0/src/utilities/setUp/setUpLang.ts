import LangManager, { locales } from '@resources/locales';

global.Lang = LangManager;
LangManager.register(locales['zh-Hans'], 'zh-Hans'); // 初始化语言，默认简体中文
