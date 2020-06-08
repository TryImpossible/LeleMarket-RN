'use strict';

import React from 'react';
import { StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: _toSP(Theme.Dimens.textNormalSize),
    marginHorizontal: _toDP(12),
  },
});

export interface LabelProps {
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
  colorValue?: Animated.Value;
  scaleValue?: Animated.Value;
  label?: string;
}

const Label: React.FC<LabelProps> = ({
  style,
  //  colorValue,
  //  scaleValue,
  isActive,
  label,
}) => {
  return (
    <Animated.Text
      // ref={(ref) => (this[`label${index}`] = ref)}
      style={[
        styles.labelStyle,
        {
          fontWeight: isActive ? 'bold' : 'normal',
          // color: colorValue,
          // transform: [{ scale: scaleValue }],
          color: isActive ? Theme.Colors.textDarkColor : Theme.Colors.textLightColor,
          transform: [{ scale: isActive ? 1.2 : 1 }],
        },
        style,
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {label}
    </Animated.Text>
  );
};

Label.defaultProps = {
  isActive: false,
};

export default Label;
