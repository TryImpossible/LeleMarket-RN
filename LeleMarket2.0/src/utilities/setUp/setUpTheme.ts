import ThemeManager, { ThemeInstance, themes } from '@resources/themes';

global.Theme = ThemeManager;
global.Styles = ThemeInstance.styles;
global.Colors = ThemeInstance.colors;
global.Dimens = ThemeInstance.dimens;

ThemeManager.register(themes.customize, 'customize'); // 初始化主题
