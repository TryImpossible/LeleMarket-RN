/// 为什么不将common.tsx中代码放至在basics.tsx？
/// common.tsx导入的包引用了basics.tsx中，分两次先后导入能解决

import ThemeManager from 'resources/themes';
import LangManager from 'resources/locales';

global.Theme = ThemeManager;
global.Lang = LangManager;
