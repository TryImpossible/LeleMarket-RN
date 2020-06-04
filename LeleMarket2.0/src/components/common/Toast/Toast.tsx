import React, { useState } from 'react';
import { Text, Animated, Easing } from 'react-native';
import Container from './Container';

type Position = 'top' | 'center' | 'bottom';

interface ToastFunction extends React.FC {
  show: (message: string, duration?: number, position?: Position) => void;
}

const defaultVisible: boolean = false;
let toastVisible: boolean = defaultVisible;
let setToastVisible: Function = () => {};

interface Options {
  message: string;
  duration?: number;
  position?: Position;
}

const defaultOptions: Options = {
  message: '我是Toast',
  duration: 2000,
  position: 'center',
};
let toastOptions: Options = defaultOptions;
let setToastOptions: Function = () => {};

const opacityValue = new Animated.Value(0);
const bounceValue = new Animated.Value(0);
let timer: any = null;

const Toast: ToastFunction = () => {
  [toastVisible, setToastVisible] = useState<boolean>(defaultVisible);
  [toastOptions, setToastOptions] = useState<Options>(defaultOptions);

  if (!toastVisible) {
    return null;
  }

  const { message, position = 'center' } = toastOptions;
  const scale = bounceValue.interpolate({ inputRange: [0, 0.8, 1], outputRange: [0, 1.2, 1] });
  return (
    <Container position={position}>
      <Animated.View style={[Theme.Toast.style, { opacity: opacityValue, transform: [{ scale }] }]}>
        <Text style={Theme.Toast.textStyle} numberOfLines={0}>
          {message}
        </Text>
      </Animated.View>
    </Container>
  );
};

Toast.show = (message, duration = 2000, position = 'center'): void => {
  if (timer != null) {
    clearTimeout(timer);
    timer = null;
    opacityValue.setValue(0);
    bounceValue.setValue(0);
  }

  setToastOptions({ message, duration, position });
  setToastVisible(true);
  Animated.parallel([
    Animated.timing(opacityValue, { toValue: 1, easing: Easing.in(Easing.ease), useNativeDriver: false }),
    Animated.spring(bounceValue, { toValue: 1, friction: 10, tension: 20, useNativeDriver: false }),
  ]).start();
  timer = setTimeout(() => {
    clearTimeout(timer);
    timer = null;
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 230,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(bounceValue, { toValue: 0, duration: 0, useNativeDriver: false }),
    ]).start(() => setToastVisible(false));
  }, duration);
};

export default Toast;
