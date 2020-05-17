import { onePX } from './dimens';
import { LineSecondary } from './colors';

export default {
  Form: {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      minHeight: _toDP(46),
      paddingHorizontal: _toDP(44),
      marginVertical: _toDP(2),
    },
    icon: {
      width: _toDP(16),
      height: _toDP(20),
      marginRight: _toDP(20),
    },
    textInputView: {
      flex: 1,
      height: '100%',
      borderBottomWidth: onePX,
      borderColor: LineSecondary,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      height: '100%',
      fontSize: _toSP(13),
    },
    button: {
      paddingLeft: _toDP(66),
      paddingRight: _toDP(30),
      justifyContent: 'space-between',
    },
    sbumit: {
      width: _toDP(290),
      height: _toDP(42),
      marginHorizontal: _toDP(42),
    },
    linkContainerStyle: {
      minHeight: _toDP(36),
      paddingLeft: _toDP(66),
      paddingRight: _toDP(30),
      justifyContent: 'space-between',
    },
  },
};
