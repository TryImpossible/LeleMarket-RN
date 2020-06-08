'use strict';

import React from 'react';
import { StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: _toDP(3),
    width: _toDP(3),
    borderRadius: _toDP(3),
    backgroundColor: Theme.Colors.accentColor,
  },
});

interface IndicatorProps {
  style?: StyleProp<ViewStyle>;
  leftValue?: Animated.Value;
  widthValue?: Animated.Value;
}

const Indicator: React.FC<IndicatorProps> = ({ style, leftValue, widthValue }) => {
  return <Animated.View style={[styles.indicator, { left: leftValue, width: widthValue }, style]} />;
};

export default Indicator;
