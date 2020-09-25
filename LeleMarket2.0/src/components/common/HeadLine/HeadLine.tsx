import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const styles = StyleSheet.create({
  headLine: {
    color: Colors.textDarkColor,
    fontWeight: 'bold',
  },
  h1: {
    fontSize: toSP(24),
  },
  h2: {
    fontSize: toSP(22),
  },
  h3: {
    fontSize: toSP(18),
  },
  h4: {
    fontSize: toSP(16),
  },
  h5: {
    fontSize: toSP(14),
  },
  h6: {
    fontSize: toSP(12),
  },
});

export interface HeadLineProps extends TextProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadLine: React.FC<HeadLineProps> = ({ children, level = 'h3', style, ...restProps }) => {
  return (
    <Text style={[styles.headLine, styles[level], style]} numberOfLines={1} {...restProps}>
      {children}
    </Text>
  );
};

export default HeadLine;
