import themes from '../resources/themes';

const ThemeManager = {
  theme: 'customize',
  ...themes.customize,
  register(themeData: object, theme: 'customize' | string) {
    Object.assign(this, themeData, { theme });
  },
};

export default ThemeManager;
