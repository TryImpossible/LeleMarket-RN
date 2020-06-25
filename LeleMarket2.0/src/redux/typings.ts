import InitialState from './store/initialState';

export type State = typeof InitialState;

export type Type = string;

export type Payload = any;

export interface Meta {
  [key: string]: any;
}

export interface Action<T> {
  type: Type;
  payload?: T;
  meta?: Meta;
}
