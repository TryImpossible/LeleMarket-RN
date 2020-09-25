import React from 'react';
import { StyleSheet, TextProps, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Colors.textLightColor,
    fontSize: toSP(Dimens.textNormalSize),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export interface LabelProps extends TextProps {}

const Label: React.FC<LabelProps> = ({ children, style, ...restProps }) => {
  return (
    <Text style={[styles.text, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default Label;
