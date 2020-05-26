export type Theme = 'customize';
export interface ThemeData {
  [name: string]: any;
}

declare const themes: {
  customize: ThemeData;
};
export default themes;
