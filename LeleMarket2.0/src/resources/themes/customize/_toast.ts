import { white } from './colors';
import { textNormalSize } from './dimens';

export default {
  style: {
    minWidth: _toDP(120),
    maxWidth: _toDP(270),
    marginVertical: _toDP(50),
    borderRadius: _toDP(8),
    backgroundColor: '#333333',
    paddingHorizontal: _toDP(16),
    paddingVertical: _toDP(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: _toSP(textNormalSize),
    color: white,
  },
};
