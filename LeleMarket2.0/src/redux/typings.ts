import { Map } from 'immutable';

export type State = typeof Map;

export type Type = string;

export type Payload = any;

export interface Meta {
  [key: string]: any;
}

export interface Action {
  type: Type;
  payload?: Payload;
  meta?: Meta;
}
