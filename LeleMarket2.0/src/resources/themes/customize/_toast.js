import { white } from './colors';
import { fontSizeTitle } from './dimens';

export default {
  Toast: {
    style: {
      minWidth: _toDP(120),
      maxWidth: _toDP(270),
      marginVertical: _toDP(50),
      borderRadius: 8,
      backgroundColor: '#606060',
      paddingHorizontal: _toDP(16),
      paddingVertical: _toDP(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      fontSize: _toSP(fontSizeTitle),
      color: white,
    },
  },
};
