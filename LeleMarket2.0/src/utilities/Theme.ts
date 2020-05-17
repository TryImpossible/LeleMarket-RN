import themes, { ThemeData, Theme } from '../resources/themes';

const ThemeManager = {
  theme: 'customize',
  ...themes.customize,
  register(themeData: ThemeData, theme: Theme) {
    Object.assign(this, themeData, { theme });
  },
};

export default ThemeManager;
