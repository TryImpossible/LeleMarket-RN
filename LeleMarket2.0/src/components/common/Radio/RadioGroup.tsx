import React, { useState, useMemo, isValidElement } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RadioProps } from './Radio';

export interface RadioGroupProps {
  style?: StyleProp<ViewStyle>;
  onChecked?: (index: number) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ children, style, onChecked }) => {
  const [index, setIndex] = useState<number>(() => {
    let value = 0;
    React.Children.forEach(children, (child, i) => {
      if (isValidElement(child) && (child.props as RadioProps).checked) {
        value = i;
      }
    });
    return value;
  });
  const _children = useMemo(
    () =>
      React.Children.map(children, (child, i) => {
        if (isValidElement(child)) {
          return React.cloneElement<RadioProps>(child, {
            onPress: () => {
              setIndex(i);
              child.props.onPress && child.props.onPress();
              onChecked && onChecked(i);
            },
            checked: i === index,
          });
        }
        return child;
      }),
    [children, index, onChecked],
  );
  return <View style={[{ flexDirection: 'row' }, style]}>{_children}</View>;
};

export default RadioGroup;
