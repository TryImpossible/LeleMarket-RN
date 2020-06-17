import { Map } from 'immutable';

export type State = typeof Map;

export type Type = string;

export type Payload = any;

export interface Meta {
  onSuccess?: (data: any) => void;
  onFailure?: (data: any) => void;
  [key: string]: any;
}

export interface Action {
  type: Type;
  payload?: Payload;
  meta?: Meta;
}
