import React, { useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StyleProp,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  icon: {
    marginRight: toDP(6),
    width: toDP(16),
    height: toDP(16),
  },
  loading: {
    marginRight: toDP(6),
  },
  title: {
    color: Colors.textNormalColor,
    fontSize: toSP(Dimens.textNormalSize),
    fontWeight: '600',
  },
});

export interface ButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'link' | 'custom';
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  loading?: boolean | React.ReactNode;
  indicatorColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  style,
  title,
  titleStyle,
  icon,
  iconStyle,
  onPress,
  disabled,
  loading,
  indicatorColor,
}) => {
  // 按钮样式
  const _styles = useMemo(() => {
    let button; // 按钮样式
    let indicator; // 指示器样式·
    let _title; // 文字样式
    switch (type) {
      case 'default':
        button = StyleSheet.flatten([styles.button, { backgroundColor: Colors.transparent }]);
        indicator = Colors.white;
        _title = StyleSheet.flatten([styles.title, { color: Colors.textNormalColor }]);
        break;
      case 'primary':
        button = StyleSheet.flatten([
          styles.button,
          { height: toDP(44), borderRadius: toDP(Dimens.borderRadiusMD), backgroundColor: Colors.buttonPrimaryColor },
        ]);
        indicator = Colors.white;
        _title = StyleSheet.flatten([styles.title, { color: Colors.white }]);
        break;
      case 'secondary':
        button = StyleSheet.flatten([
          styles.button,
          {
            height: toDP(44),
            borderRadius: toDP(Dimens.borderRadiusMD),
            borderColor: Colors.accentColor,
            borderWidth: Dimens.borderWidth,
            backgroundColor: Colors.buttonSecondaryColor,
          },
        ]);
        indicator = Colors.accentColor;
        _title = StyleSheet.flatten([styles.title, { color: Colors.buttonSecondaryTitleColor }]);
        break;
      case 'danger':
        button = StyleSheet.flatten([
          styles.button,
          {
            height: toDP(44),
            borderRadius: toDP(Dimens.borderRadiusMD),
            borderColor: Colors.red,
            borderWidth: Dimens.borderWidth,
            backgroundColor: Colors.buttonDangerColor,
          },
        ]);
        indicator = Colors.red;
        _title = StyleSheet.flatten([styles.title, { color: Colors.buttonDangerTitleColor }]);
        break;
      default:
        button = StyleSheet.flatten(styles.button);
        indicator = Colors.transparent;
        _title = StyleSheet.flatten(styles.title);
        break;
    }
    return { button, indicator, title: _title };
  }, [type]);

  return (
    <TouchableOpacity
      style={[_styles.button, style]}
      activeOpacity={Dimens.activeOpacity}
      onPress={onPress}
      disabled={disabled}
    >
      {loading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={indicatorColor || _styles.indicator} />
        </View>
      ) : (
        loading
      )}
      {icon && <Image source={icon} style={[styles.icon, StyleSheet.flatten(iconStyle)]} />}
      {title && (
        <Text style={[_styles.title, StyleSheet.flatten(titleStyle)]} adjustsFontSizeToFit>
          {title}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
