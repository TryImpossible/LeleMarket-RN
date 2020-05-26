import { CustomAxiosRequestConfig } from './index';

type Content = [string, any, string?];

type Logger = (groupTitle: string, groupContent: Content, groupColor?: 'green' | 'red') => void;

// type Fun = (x: number, y: number) => number;
// interface Fun {
//   (x: number, y: number): number;
// }

const logger: Logger = (groupTitle, groupContent: Content, groupColor = 'green') => {
  console.group && console.group(`%c${groupTitle}`, `color: ${groupColor}`);
  groupContent.forEach((element: Content) => {
    if (element) {
      const [title, content, color = 'green'] = element;
      console.info && console.info(`%c${title}`, `color: ${color}`, '\n', content);
    }
  });
  console.groupEnd && console.groupEnd();
};

export function request(req: CustomAxiosRequestConfig) {}

export function response() {}

export function error() {}
