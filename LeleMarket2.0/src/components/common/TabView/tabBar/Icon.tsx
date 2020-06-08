'use strict';

import React from 'react';
import { StyleSheet, Image, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {
    width: _toDP(16),
    height: _toDP(16),
    marginBottom: _toDP(4),
  },
});

export interface IconProps {
  style?: StyleProp<ImageStyle>;
  isActive?: boolean;
  source: ImageSourcePropType;
}

const Icon: React.FC<IconProps> = ({ style, source }) => {
  return <Image style={[styles.iconStyle, style]} source={source} />;
};

Icon.defaultProps = {
  isActive: false,
};

export default Icon;
