import { StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { backgroundColor, textNormalColor, textDarkColor, accentColor } from './colors';
import { navBarHeight, statusBarHeight, textNormalSize, textTitleSize } from './dimens';

export default {
  style: {
    width: '100%',
    height: _toDP(navBarHeight) + statusBarHeight,
    paddingTop: statusBarHeight,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  backContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  backStyle: {
    height: _toDP(navBarHeight),
    minWidth: _toDP(navBarHeight),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: _toDP(6),
    paddingRight: _toDP(16),
  } as StyleProp<ViewStyle>,
  backIconStyle: {
    width: _toDP(24),
    height: _toDP(24),
  } as StyleProp<ImageStyle>,
  backTitleStyle: {
    fontSize: _toSP(textNormalSize),
    color: textNormalColor,
    lineHeight: _toDP(16),
  } as StyleProp<TextStyle>,
  titleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: _toDP(200),
  } as StyleProp<ViewStyle>,
  titleStyle: {
    fontSize: _toSP(textTitleSize),
    color: textDarkColor,
  } as StyleProp<TextStyle>,
  menuContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  menuStyle: {
    height: _toDP(navBarHeight),
    minWidth: _toDP(navBarHeight),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: _toDP(16),
  } as StyleProp<ViewStyle>,
  menuIconStyle: {
    width: _toDP(26),
    height: _toDP(26),
  } as StyleProp<ImageStyle>,
  menuTitleStyle: {
    fontSize: _toSP(textNormalSize),
    color: accentColor,
  } as StyleProp<TextStyle>,
};
