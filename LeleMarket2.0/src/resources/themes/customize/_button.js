import { buttonPrimary, white, LineSecondary } from './colors';
import { fontSizeButton, onePX } from './dimens';

export default {
  Button: {
    style: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: white,
      fontSize: _toSP(fontSizeButton),
      textAlign: 'center',
      padding: 0,
    },
    icon: {},
    ellipse: {
      width: _toDP(131),
      height: _toDP(42),
      borderRadius: _toDP(21),
      backgroundColor: buttonPrimary,
    },
    countDown: {
      style: {
        width: _toDP(80),
        height: _toDP(24),
        borderRadius: _toDP(21),
      },
      title: {
        color: white,
        fontSize: _toSP(12),
      },
    },
    select: {
      style: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: _toDP(3),
        marginRight: _toDP(12),
        borderBottomWidth: onePX,
        borderColor: LineSecondary,
      },
      title: {
        fontSize: _toSP(14),
        color: '#454545',
        paddingRight: _toDP(4),
      },
      icon: {
        width: _toDP(8),
        height: _toDP(12),
      },
    },
  },
};
