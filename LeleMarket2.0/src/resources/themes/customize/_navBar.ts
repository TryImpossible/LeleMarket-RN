import { backgroundColor, textNormalColor, textDarkColor, accentColor } from './colors';
import { navBarHeight, statusBarHeight, textNormalSize, textTitleSize } from './dimens';

export default {
  style: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: _toDP(navBarHeight) + statusBarHeight,
    paddingTop: statusBarHeight,
    backgroundColor: backgroundColor,
  },
  headerStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerLeftStyle: {
    height: _toDP(navBarHeight),
    minWidth: _toDP(navBarHeight),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftImageStyle: {
    width: _toDP(10),
    height: _toDP(17),
  },
  headerLeftTitleStyle: {
    fontSize: _toSP(textNormalSize),
    color: textNormalColor,
    lineHeight: _toDP(16),
  },
  headerTitleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: _toDP(200),
  },
  headerTitleStyle: {
    fontSize: _toSP(textTitleSize),
    color: textDarkColor,
  },
  headerRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerRightStyle: {
    height: _toDP(navBarHeight),
    minWidth: _toDP(navBarHeight),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: _toDP(16),
  },
  headerRightTitleStyle: {
    fontSize: _toSP(textNormalSize),
    color: accentColor,
  },
};
