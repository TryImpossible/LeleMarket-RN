import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  hint: {
    width: toDP(4),
    height: toDP(16),
    borderRadius: toDP(3),
    backgroundColor: Colors.accentColor,
  },
});

export interface BadgeHintProps extends ViewProps {}

const BadgeHint: React.FC<BadgeHintProps> = ({ style, ...restProps }) => {
  return <View style={[styles.hint, style]} {...restProps} />;
};

export default BadgeHint;
