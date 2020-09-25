import React, { useState, useMemo, isValidElement } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { CheckBoxProps } from './CheckBox';

export interface CheckBoxGroupProps {
  style?: StyleProp<ViewStyle>;
  onChecked?: (indexs: number[]) => void;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ children, style, onChecked }) => {
  const [indexs, setIndexs] = useState<number[]>(() => {
    const value = new Set();
    React.Children.forEach(children, (child, i) => {
      if (isValidElement(child) && (child.props as CheckBoxProps).checked) {
        value.add(i);
      }
    });
    return Array.from(value) as number[];
  });
  const _children = useMemo(
    () =>
      React.Children.map(children, (child, i) => {
        if (isValidElement(child)) {
          return React.cloneElement<CheckBoxProps>(child, {
            onPress: () => {
              let newIndexs: number[] = Object.assign([], indexs);
              if (indexs.every((item) => item !== i)) {
                newIndexs.push(i);
              } else {
                newIndexs.splice(
                  indexs.findIndex((item) => item === i),
                  1,
                );
              }
              newIndexs = newIndexs.sort();
              setIndexs(newIndexs);
              onChecked && onChecked(newIndexs);
            },
            checked: indexs.some((item) => item === i),
          });
        }
        return child;
      }),
    [children, indexs, onChecked],
  );
  return <View style={[{ flexDirection: 'row' }, style]}>{_children}</View>;
};

export default CheckBoxGroup;
