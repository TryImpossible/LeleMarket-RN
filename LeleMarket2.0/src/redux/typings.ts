import InitialState from './store/initialState';

export type State = typeof InitialState;

export type Type = string;

export interface Meta {
  [key: string]: any;
}

export interface Action<T = any> {
  type: Type;
  payload?: T;
  meta?: Meta;
}
