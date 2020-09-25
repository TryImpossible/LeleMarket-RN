import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  StyleProp,
  ViewStyle,
  Easing,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import KeyboardSpacer from '../KeyboardSpacer';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
  },
});

export interface OverlayViewProps {
  style?: StyleProp<ViewStyle>;
  display?: boolean;
  closeOnTouchOutside?: boolean;
  closeOnBackPress?: boolean;
  onCloseRequest?: () => void;
  onShowCompleted?: () => void;
  onDismissCompleted?: () => void;
  children?: React.ReactNode;
  autoKeyboardInsets?: boolean;
}

export interface OverlayViewHandles {
  isVisible: () => boolean;
  show: (callback?: Function) => void;
  dismiss: (callback?: Function) => void;
}

const OverlayView: React.ForwardRefRenderFunction<OverlayViewHandles, OverlayViewProps> = (
  {
    children,
    style,
    closeOnTouchOutside = true,
    closeOnBackPress = true,
    onCloseRequest,
    onShowCompleted,
    onDismissCompleted,
    display = false,
    autoKeyboardInsets = false,
  },
  ref,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const panReponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderGrant: (_evt, gestureState) => {
      console.log(gestureState);
    },
    onPanResponderRelease: (_evt, _gestureState) =>
      closeOnTouchOutside && (onCloseRequest ? onCloseRequest() : dismiss()),
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
        setVisible(false);
        dismissCallback.current && dismissCallback.current();
        onDismissCompleted && onDismissCompleted();
      });
    },
    [isVisible, onDismissCompleted, valuePath],
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
  useEffect(() => {
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

  useEffect(() => {
    if (visible) {
      Animated.timing(valuePath, {
        toValue: 1,
        duration: 30,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        showCallback.current && showCallback.current();
        onShowCompleted && onShowCompleted();
      });
    }
  }, [onShowCompleted, valuePath, visible]);

  useEffect(() => {
    display && show();
  }, [display, show]);

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
      // {...panReponder.panHandlers}
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        onPress={() => closeOnTouchOutside && (onCloseRequest ? onCloseRequest() : dismiss())}
      />
      {children}
      {autoKeyboardInsets && __IOS__ && <KeyboardSpacer />}
    </Animated.View>
  );
};

export default React.forwardRef(OverlayView);
