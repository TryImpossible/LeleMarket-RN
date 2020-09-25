import { createContext } from 'react';
import { Value, Values, Rule, Rules } from './types';

export interface FormContextProps {
  values: Values;
  getValue: (key: string) => Value;
  addValue: (key: string, value: Value) => void;
  delValue: (key: string) => void;
  clearValues: () => void;
  rules: Rules;
  getRule: (key: string) => Rule[];
  addRule: (key: string, value: Rule[]) => void;
  delRule: (key: string) => void;
  clearRules: () => void;
  validate: () => boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const FormContext = createContext<FormContextProps>(null);

export default FormContext;
