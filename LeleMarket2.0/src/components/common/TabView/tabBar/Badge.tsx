'use strict';

import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    right: _toDP(2),
    top: _toDP(2),
    width: _toDP(8),
    height: _toDP(8),
    borderRadius: _toDP(4),
    backgroundColor: 'red',
  },
});

export interface BadgeProps {
  style?: StyleProp<ViewStyle>;
  count?: number;
}

const Badge: React.FC<BadgeProps> = ({ style, count = 0 }) => {
  return <View style={[styles.badgeStyle, style, { opacity: count > 0 ? 1 : 0 }]} />;
};

Badge.defaultProps = {
  count: 0,
};

function isEqual(prevProps: BadgeProps, nextProps: BadgeProps) {
  return prevProps.count === nextProps.count;
}

export default React.memo(Badge, isEqual);
