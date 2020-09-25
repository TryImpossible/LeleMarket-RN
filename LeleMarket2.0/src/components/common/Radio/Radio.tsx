import React from 'react';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import Button, { ButtonProps } from '../Button';
import IMAGES from '@resources/images';

const styles = StyleSheet.create({
  Radio: {
    height: 'auto',
    alignSelf: 'stretch',
  },
  icon: {
    width: toDP(15),
    height: toDP(15),
  },
  title: {
    color: Colors.textNormalColor,
  },
});

export interface RadioProps
  extends Pick<ButtonProps, 'style' | 'iconStyle' | 'title' | 'titleStyle' | 'disabled' | 'onPress'> {
  checked?: boolean;
  activeIcon?: ImageSourcePropType;
  inactiveIcon?: ImageSourcePropType;
}

const Radio: React.FC<RadioProps> = ({
  style,
  iconStyle,
  title,
  titleStyle,
  disabled,
  onPress,
  checked = false,
  activeIcon = { uri: IMAGES.ic_checkbox_active },
  inactiveIcon = { uri: IMAGES.ic_checkbox },
}) => {
  return (
    <Button
      style={[styles.Radio, style]}
      icon={checked ? activeIcon : inactiveIcon}
      title={title}
      iconStyle={[styles.icon, iconStyle]}
      titleStyle={[styles.title, titleStyle]}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default Radio;
