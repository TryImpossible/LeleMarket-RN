import { backgroundLight, textPrimary, textSecondary, themePrimary } from './colors';
import { heightNavBar, heightStatusBar, fontSizeTitle, fontSizeHeadline } from './dimens';

export default {
  NavBar: {
    style: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: _toDP(heightNavBar) + heightStatusBar,
      paddingTop: heightStatusBar,
      backgroundColor: backgroundLight,
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
      height: _toDP(heightNavBar),
      minWidth: _toDP(heightNavBar),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerLeftImageStyle: {
      width: _toDP(10),
      height: _toDP(17),
    },
    headerLeftTitleStyle: {
      fontSize: _toSP(fontSizeTitle),
      color: textSecondary,
      lineHeight: _toDP(16),
    },
    headerTitleContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: _toDP(200),
    },
    headerTitleStyle: {
      fontSize: _toSP(fontSizeHeadline),
      color: textPrimary,
    },
    headerRightContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    headerRightStyle: {
      height: _toDP(heightNavBar),
      minWidth: _toDP(heightNavBar),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: _toDP(16),
    },
    headerRightTitleStyle: {
      fontSize: _toSP(fontSizeTitle),
      color: themePrimary,
    },
  },
};
