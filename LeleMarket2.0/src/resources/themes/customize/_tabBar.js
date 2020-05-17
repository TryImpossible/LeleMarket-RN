import { white } from './colors';
import { heightTabBar, heightSafeBottom } from './dimens';

export default {
  TabBar: {
    style: {
      width: '100%',
      height: _toDP(heightTabBar + heightSafeBottom),
      paddingBottom: _toDP(heightSafeBottom),
      backgroundColor: white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    item: {
      style: {
        width: _toDP(75),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        width: _toDP(22),
        height: _toDP(18),
        marginBottom: _toDP(4),
      },
      title: {
        color: '#787D87',
        fontSize: _toSP(11),
      },
    },
    center: {
      style: {
        width: _toDP(75),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      },
      iconView: {
        width: _toDP(56),
        height: _toDP(56),
        borderRadius: _toDP(28),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: _toDP(-12),
      },
      icon: {
        width: _toDP(56),
        height: _toDP(56),
        borderRadius: _toDP(28),
      },
    },
  },
};
