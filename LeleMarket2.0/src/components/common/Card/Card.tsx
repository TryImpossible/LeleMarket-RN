import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    backgroundColor: Colors.cardColor,
    // borderRadius: toDP(Dimens.borderRadiusMD),
  },
});

export interface CardProps extends ViewProps {}

const Card: React.FC<CardProps> = ({ style, ...restProps }) => {
  return <View style={[styles.card, style]} {...restProps} />;
};

export default Card;
