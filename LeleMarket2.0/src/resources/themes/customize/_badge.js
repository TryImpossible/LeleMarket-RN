import { themeSecondary, white } from './colors';

export default {
  Badge: {
    dotStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: _toDP(7),
      height: _toDP(7),
      borderRadius: _toDP(3.5),
      backgroundColor: themeSecondary,
    },
    capsuleStyle: {
      width: _toDP(24),
      height: _toDP(16),
      borderRadius: _toDP(7),
      backgroundColor: themeSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    squareStyle: {
      width: _toDP(20),
      height: _toDP(20),
      borderRadius: _toDP(10),
      backgroundColor: themeSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    countStyle: {
      color: white,
      fontSize: _toDP(11),
    },
  },
};
