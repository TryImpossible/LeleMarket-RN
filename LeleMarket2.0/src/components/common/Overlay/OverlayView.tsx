import React, { useState, useRef, useCallback, useImperativeHandle } from 'react';
import { StyleSheet, Animated, PanResponder, StyleProp, ViewStyle, Easing, BackHandler } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
  },
});

export interface OverlayViewProps {
  style?: StyleProp<ViewStyle>;
  closeOnTouch?: boolean;
  closeOnBackPress?: boolean;
  onCloseRequest?: () => void;
  children?: React.ReactNode;
}

export interface OverlayViewHandle {
  isVisible: () => boolean;
  show: (callback?: Function) => void;
  dismiss: (callback?: Function) => void;
}

const OverlayView: React.ForwardRefRenderFunction<OverlayViewHandle, OverlayViewProps> = (
  { children, style, closeOnTouch = true, closeOnBackPress = true, onCloseRequest },
  ref,
) => {
  const panReponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderGrant: (_evt, _gestureState) => {},
    onPanResponderRelease: (_evt, _gestureState) => closeOnTouch && (onCloseRequest ? onCloseRequest() : dismiss()),
  });

  const [visible, setVisible] = useState<boolean>(false);
  const valuePath = useRef(new Animated.Value(0)).current;
  const showCallback = useRef<Function>(); // 显示的回调
  const dismissCallback = useRef<Function>(); //消失的回调

  // 是否显示
  const isVisible = useCallback(() => visible, [visible]);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      if (isVisible()) {
        return;
      }
      setVisible(true);
      showCallback.current = callback;
    },
    [isVisible],
  );

  // 消失
  const dismiss = useCallback(
    (callback?: Function) => {
      if (!isVisible()) {
        return;
      }
      dismissCallback.current = callback;
      Animated.timing(valuePath, {
        toValue: 0,
        duration: 30,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        dismissCallback.current && dismissCallback.current();
        setVisible(false);
      });
    },
    [isVisible, valuePath],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(
    ref,
    () => {
      return { isVisible, show, dismiss };
    },
    [isVisible, show, dismiss],
  );

  // Android端监听返回键事件
  React.useEffect(() => {
    if (!__ANDROID__) {
      return;
    }
    if (!closeOnBackPress) {
      return;
    }
    const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        dismiss();
        return true;
      }
      return false;
    });
    return () => backHandlerListener.remove();
  }, [closeOnBackPress, dismiss, visible]);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(valuePath, {
        toValue: 1,
        duration: 30,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        showCallback.current && showCallback.current();
      });
    }
  }, [valuePath, visible]);

  if (!visible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.overlay,
        StyleSheet.flatten(style),
        { opacity: valuePath.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1] }) },
      ]}
      {...panReponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default React.forwardRef(OverlayView);
