import customize from './customize';

export type Theme = 'customize' | string;

export type ThemeData = any;

export interface Themes {
  customize: ThemeData;
  [name: string]: ThemeData;
}

const themes: Themes = {
  customize,
};

export default themes;
