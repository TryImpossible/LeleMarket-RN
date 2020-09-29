import React, { useState, useContext, useEffect } from 'react';
import { View, StyleProp, ViewStyle, TextInputProps, TouchableWithoutFeedbackProps } from 'react-native';
import { Rule } from './types';
import FormContext from './FormContext';

export type FormItemType =
  | 'text'
  | 'date'
  | 'datetime'
  | 'search'
  | 'image'
  | 'number'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'password'
  | 'button'
  | 'submit'
  | 'reset';

export interface FormItemProps {
  style?: StyleProp<ViewStyle>;
  type: FormItemType;
  name: string;
  rules?: Rule[];
}

const FormItem: React.FC<FormItemProps> = ({ style, type, name, rules, children }) => {
  const { addValue, getValue, addRule, validate, onSubmit, onReset } = useContext(FormContext);
  const [value, setValue] = useState<string>(() => getValue(name));

  useEffect(() => {
    if (rules) {
      addRule(name, rules);
    }
  }, [addRule, name, rules]);

  return (
    <View style={style}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        if (['text', 'search', 'number', 'email', 'password'].includes(type)) {
          const { onChangeText } = (child.props || {}) as TextInputProps;
          return React.cloneElement<TextInputProps>(child, {
            value,
            onChangeText: (text) => {
              addValue(name, text);
              setValue(text);
              onChangeText && onChangeText(text);
            },
          });
        }
        if (type === 'submit') {
          const { onPress } = (child.props || {}) as TouchableWithoutFeedbackProps;
          return React.cloneElement<TouchableWithoutFeedbackProps>(child, {
            onPress: () => {
              if (validate()) {
                onSubmit();
                // @ts-ignore
                onPress && onPress(null);
              }
            },
          });
        }
        if (type === 'reset') {
          const { onPress } = (child.props || {}) as TouchableWithoutFeedbackProps;
          return React.cloneElement<TouchableWithoutFeedbackProps>(child, {
            onPress: () => {
              onReset();
              // @ts-ignore
              onPress && onPress(null);
            },
          });
        }
        return child;
      })}
    </View>
  );
};

FormItem.defaultProps = {
  type: 'text',
};

export default FormItem;
