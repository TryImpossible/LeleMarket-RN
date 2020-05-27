import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    top: _toDP(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface ToastProps {}

interface ToastFunction extends React.FC<ToastProps> {
  show: Function;
  dismiss: Function;
}

const defaultVisible: boolean = false;
let toastVisible: boolean = defaultVisible;
let setToastVisible: Function = () => {};

const Toast: ToastFunction = () => {
  [toastVisible, setToastVisible] = useState(false);
  if (!toastVisible) {
    return null;
  }
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Text>我是Toast</Text>
    </View>
  );
};

Toast.show = (): void => setToastVisible(true);
Toast.dismiss = (): void => setToastVisible(false);

export default Toast;
