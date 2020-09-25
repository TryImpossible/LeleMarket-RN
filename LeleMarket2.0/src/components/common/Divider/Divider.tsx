import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'stretch',
    backgroundColor: Colors.dividerColor,
    height: Dimens.dividerHeight,
  },
});

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

export default Divider;
