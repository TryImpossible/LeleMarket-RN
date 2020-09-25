export type Value = string;

export interface Values {
  [key: string]: Value;
}

export interface Rule {
  required?: boolean;
  validator?: (text: string) => boolean;
  message?: string;
}

export interface Rules {
  [key: string]: Rule[];
}
