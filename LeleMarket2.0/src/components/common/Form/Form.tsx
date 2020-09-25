import React, { useRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import Toast from '../Toast';
import FormItem from './FormItem';
import FormContext from './FormContext';
import { Values, Value, Rules, Rule } from './types';
import * as Validator from '@utilities/Validator';

export interface FormProps extends ScrollViewProps {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  onReset: () => void;
}

const Form: React.FC<FormProps> & { Item: typeof FormItem } = ({
  children,
  initialValues,
  onSubmit,
  onReset,
  ...restProps
}) => {
  const _valuesRef = useRef<Values>(initialValues).current;
  const _rulesRef = useRef<Rules>({}).current;
  const _value = {
    values: _valuesRef,
    getValue: (key: string) => _valuesRef[key],
    addValue: (key: string, value: Value) => (_valuesRef[key] = value),
    delValue: (key: string) => delete _valuesRef[key],
    clearValues: () => Object.keys(_valuesRef).forEach((key) => delete _valuesRef[key]),
    rules: _rulesRef,
    getRule: (key: string) => _rulesRef[key],
    addRule: (key: string, value: Rule[]) => (_rulesRef[key] = value),
    delRule: (key: string) => delete _rulesRef[key],
    clearRules: () => Object.keys(_rulesRef).forEach((key) => delete _valuesRef[key]),
    validate: () => {
      if (Validator.isEmpty(_rulesRef)) {
        return true;
      }
      return Object.keys(_rulesRef).every((key) => {
        return _rulesRef[key].every((rule) => {
          const { required, validator, message } = rule; // required、validator只能存一
          if (required) {
            // 必填，默认验证是否为空
            const isValid = !Validator.isEmpty(_valuesRef[key]);
            if (!isValid) {
              message && Toast.show(message);
              return false;
            }
          }
          if (validator) {
            // 验证器存在，则执行验证器
            const isValid = validator(_valuesRef[key]);
            if (!isValid) {
              message && Toast.show(message);
              return false;
            }
          }
          return true;
        });
      });
    },
    onSubmit: () => onSubmit && onSubmit(_valuesRef),
    onReset: () => {
      _value.clearValues();
      onReset && onReset();
    },
  };

  return (
    <FormContext.Provider value={_value}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" {...restProps}>
        {children}
      </ScrollView>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;
Form.defaultProps = {
  initialValues: {},
};

export default Form;
