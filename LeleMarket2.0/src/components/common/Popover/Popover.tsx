/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export type ArrowType =
  | 'none'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop';

export interface PopoverProps {
  style?: StyleProp<ViewStyle>;
  arrow?: ArrowType;
  size?: number;
}

const Popover: React.FC<PopoverProps> = ({ style, arrow, size = toDP(5), children }) => {
  const containerStyle = useMemo(() => {
    const { marginTop, marginRight, marginBottom, marginLeft, marginHorizontal, marginVertical } = StyleSheet.flatten(
      style,
    );
    const baseStyle = {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginHorizontal,
      marginVertical,
    };
    switch (arrow) {
      case 'topLeft':
      case 'top':
      case 'topRight':
        return {
          ...baseStyle,
          flexDirection: 'column',
        };
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        return {
          ...baseStyle,
          flexDirection: 'column-reverse',
        };
      case 'leftTop':
      case 'left':
      case 'leftBottom':
        return {
          ...baseStyle,
          flexDirection: 'row',
        };
      case 'rightTop':
      case 'right':
      case 'rightBottom':
        return {
          ...baseStyle,
          flexDirection: 'row-reverse',
        };
      default:
        return {};
    }
  }, [arrow, style]);

  const arrowStyle = useMemo(() => {
    const _style = {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: size,
      borderTopColor: Colors.transparent, // 下箭头颜色
      borderLeftColor: Colors.transparent, // 右箭头颜色
      borderBottomColor: Colors.transparent, // 上箭头颜色
      borderRightColor: Colors.transparent, // 左箭头颜色
    };
    const { backgroundColor: color = Colors.white } = StyleSheet.flatten(style);
    const arrowRatio = 1.3;
    const spaceRatio = 1.5;
    switch (arrow) {
      case 'topLeft':
        Object.assign(_style, {
          borderBottomColor: color,
          borderBottomWidth: size * arrowRatio,
          alignSelf: 'flex-start',
          marginLeft: size * spaceRatio,
        });
        break;
      case 'top':
        Object.assign(_style, { borderBottomColor: color, borderBottomWidth: size * arrowRatio, alignSelf: 'center' });
        break;
      case 'topRight':
        Object.assign(_style, {
          borderBottomColor: color,
          borderBottomWidth: size * arrowRatio,
          alignSelf: 'flex-end',
          marginRight: size * spaceRatio,
        });
        break;
      case 'bottomLeft':
        Object.assign(_style, {
          borderTopColor: color,
          borderTopWidth: size * arrowRatio,
          alignSelf: 'flex-start',
          marginLeft: size * spaceRatio,
        });
        break;
      case 'bottom':
        Object.assign(_style, { borderTopColor: color, borderTopWidth: size * arrowRatio, alignSelf: 'center' });
        break;
      case 'bottomRight':
        Object.assign(_style, {
          borderTopColor: color,
          borderTopWidth: size * arrowRatio,
          alignSelf: 'flex-end',
          marginRight: size * spaceRatio,
        });
        break;
      case 'leftTop':
        Object.assign(_style, {
          borderRightColor: color,
          borderRightWidth: size * arrowRatio,
          alignSelf: 'flex-start',
          marginTop: size * spaceRatio,
        });
        break;
      case 'left':
        Object.assign(_style, { borderRightColor: color, borderRightWidth: size * arrowRatio, alignSelf: 'center' });
        break;
      case 'leftBottom':
        Object.assign(_style, {
          borderRightColor: color,
          borderRightWidth: size * arrowRatio,
          alignSelf: 'flex-end',
          marginBottom: size * spaceRatio,
        });
        break;
      case 'rightTop':
        Object.assign(_style, {
          borderLeftColor: color,
          borderLeftWidth: size * arrowRatio,
          alignSelf: 'flex-start',
          marginTop: size * spaceRatio,
        });
        break;
      case 'right':
        Object.assign(_style, { borderLeftColor: color, borderLeftWidth: size * arrowRatio, alignSelf: 'center' });
        break;
      case 'rightBottom':
        Object.assign(_style, {
          borderLeftColor: color,
          borderLeftWidth: size * arrowRatio,
          alignSelf: 'flex-end',
          marginBottom: size * spaceRatio,
        });
        break;
      default:
        return {};
    }
    return _style;
  }, [arrow, size, style]);

  const childrenStyle = useMemo(() => {
    const {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginHorizontal,
      marginVertical,
      ...otherStyle
    } = StyleSheet.flatten(style);
    return [{ backgroundColor: Colors.white }, otherStyle];
  }, [style]);

  return (
    <View style={containerStyle}>
      <View style={arrowStyle} />
      <View style={childrenStyle}>{children}</View>
    </View>
  );
};

export default Popover;
