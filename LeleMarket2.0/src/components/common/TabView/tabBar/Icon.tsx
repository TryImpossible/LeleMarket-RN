'use strict';

import React from 'react';
import { StyleSheet, Image, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {
    width: toDP(24),
    height: toDP(24),
    marginBottom: toDP(4),
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
