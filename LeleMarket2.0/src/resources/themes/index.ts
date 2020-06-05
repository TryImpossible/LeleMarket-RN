import customize from './customize';

export type Theme = 'customize' | string;

export type ThemeData = typeof customize;

export interface Themes {
  customize: ThemeData;
  [name: string]: ThemeData;
}

const themes: Themes = {
  customize,
};

const ThemeManager = {
  theme: 'customize',
  ...themes.customize,
  register(themeData: ThemeData, theme: Theme) {
    Object.assign(this, themeData, { theme });
  },
};

export { ThemeManager as default, themes };
