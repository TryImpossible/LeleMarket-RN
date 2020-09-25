import React, { useRef, useEffect, useImperativeHandle, useCallback, useMemo } from 'react';
import { Animated, StyleProp, ViewStyle, Easing, StyleSheet } from 'react-native';
import OverlayView, { OverlayViewProps, OverlayViewHandles } from './OverlayView';

const styles = StyleSheet.create({
  overlayView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface OverlayPopViewProps extends OverlayViewProps {
  type?: 'zoomIn' | 'zoomOut';
  containerStyle?: StyleProp<ViewStyle>;
}

export interface OverlayPopViewHandles extends OverlayViewHandles {}

const OverlayPopView: React.ForwardRefRenderFunction<OverlayPopViewHandles, OverlayPopViewProps> = (
  { style, containerStyle, type = 'zoomOut', children, onCloseRequest, display = false, ...restProps },
  ref,
) => {
  const overlayViewRef = useRef<OverlayViewHandles>(null);
  const pathValue = useRef(new Animated.Value(0)).current;

  // 是否显示
  const isVisible = useCallback(() => (overlayViewRef.current ? overlayViewRef.current.isVisible() : false), []);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      overlayViewRef.current?.show(() => {
        Animated.timing(pathValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.linear),
          useNativeDriver: false,
        }).start(() => callback && callback());
      });
    },
    [pathValue],
  );

  // 消失
  const dismiss = useCallback(
    (callback?: Function) => {
      onCloseRequest && onCloseRequest();
      Animated.timing(pathValue, {
        toValue: 0,
        duration: 50,
        easing: Easing.out(Easing.linear),
        useNativeDriver: false,
      }).start(() => {
        overlayViewRef.current?.dismiss();
        callback && callback();
      });
    },
    [onCloseRequest, pathValue],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => {
    return { isVisible, show, dismiss };
  });

  const getTransform = useMemo(() => {
    switch (type) {
      case 'zoomIn':
        return [
          { translateX: 0 },
          { translateY: 0 },
          { scaleX: pathValue.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
          { scaleY: pathValue.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
        ];
      case 'zoomOut':
      default:
        return [
          { translateX: 0 },
          { translateY: 0 },
          { scaleX: pathValue.interpolate({ inputRange: [0, 1], outputRange: [1.2, 1] }) },
          { scaleY: pathValue.interpolate({ inputRange: [0, 1], outputRange: [1.2, 1] }) },
        ];
    }
  }, [pathValue, type]);

  useEffect(() => {
    display && show();
  }, [display, show]);

  return (
    <OverlayView ref={overlayViewRef} style={[styles.overlayView, style]} onCloseRequest={dismiss} {...restProps}>
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          {
            opacity: pathValue,
            transform: getTransform,
          },
        ]}
        pointerEvents="box-none"
      >
        {children}
      </Animated.View>
    </OverlayView>
  );
};

export default React.forwardRef(OverlayPopView);
