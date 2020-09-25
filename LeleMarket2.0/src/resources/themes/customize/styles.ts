import { StyleProp, ViewStyle } from 'react-native';

export default {
  // 水平居中
  HC: {
    flexDirection: 'row',
    justifyContent: 'center',
  } as StyleProp<ViewStyle>,
  // 垂直居中
  VC: {
    flexDirection: 'column',
    justifyContent: 'center',
  } as StyleProp<ViewStyle>,
  // 水平、垂直居中
  HVC: {
    justifyContent: 'center',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
};
