import React from 'react';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import Button, { ButtonProps } from '../Button';
import IMAGES from '@resources/images';

const styles = StyleSheet.create({
  checkBox: {
    height: 'auto',
    alignSelf: 'stretch',
  },
  icon: {
    width: toDP(20),
    height: toDP(20),
  },
  title: {
    color: Colors.textDarkColor,
  },
});

export interface CheckBoxProps
  extends Pick<ButtonProps, 'style' | 'iconStyle' | 'title' | 'titleStyle' | 'disabled' | 'onPress'> {
  checked?: boolean;
  activeIcon?: ImageSourcePropType;
  inactiveIcon?: ImageSourcePropType;
}

const CheckBox: React.FC<CheckBoxProps> = ({
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
      style={[styles.checkBox, style]}
      icon={checked ? activeIcon : inactiveIcon}
      title={title}
      iconStyle={[styles.icon, iconStyle]}
      titleStyle={[styles.title, titleStyle]}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default CheckBox;
