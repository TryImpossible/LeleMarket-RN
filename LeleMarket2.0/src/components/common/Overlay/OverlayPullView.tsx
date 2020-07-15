import React, { useRef, useImperativeHandle, useCallback, useMemo } from 'react';
import { StyleSheet, Animated, StyleProp, ViewStyle, Easing } from 'react-native';
import OverlayView, { OverlayViewProps, OverlayViewHandle } from './OverlayView';

export interface OverlayPullViewProps extends OverlayViewProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  containerStyle?: StyleProp<ViewStyle>;
}

export interface OverlayPullViewHandle extends OverlayViewHandle {}

const OverlayPullView: React.ForwardRefRenderFunction<OverlayPullViewHandle, OverlayPullViewProps> = (
  { style, containerStyle, side = 'bottom', children, onCloseRequest, ...rest },
  ref,
) => {
  const overlayViewRef = useRef<OverlayViewHandle>(null);
  const pathValue = useRef(new Animated.Value(0)).current;

  // 是否显示
  const isVisible = useCallback(() => (overlayViewRef.current ? overlayViewRef.current.isVisible() : false), []);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      overlayViewRef.current?.show(() => {
        Animated.spring(pathValue, {
          toValue: 1,
          bounciness: 3,
          speed: 9,
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

  const getStyle = useMemo(() => {
    let sideStyle;
    switch (side) {
      case 'top':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        break;
      case 'right':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        break;
      case 'bottom':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        break;
      case 'left':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        break;
      default:
        sideStyle = {};
    }
    return StyleSheet.flatten([style, sideStyle]) as ViewStyle;
  }, [side, style]);

  const getTransform = useMemo(() => {
    switch (side) {
      case 'top':
        return [{ translateY: pathValue.interpolate({ inputRange: [0, 1], outputRange: [-__HEIGHT__, 0] }) }];
      case 'right':
        return [{ translateX: pathValue.interpolate({ inputRange: [0, 1], outputRange: [__WIDTH__, 0] }) }];
      case 'bottom':
        return [{ translateY: pathValue.interpolate({ inputRange: [0, 1], outputRange: [__HEIGHT__, 0] }) }];
      case 'left':
        return [{ translateX: pathValue.interpolate({ inputRange: [0, 1], outputRange: [-__WIDTH__, 0] }) }];
      default:
        return [];
    }
  }, [pathValue, side]);

  return (
    <OverlayView ref={overlayViewRef} style={getStyle} onCloseRequest={dismiss} {...rest}>
      <Animated.View
        style={[
          containerStyle,
          {
            backgroundColor: 'red',
            opacity: pathValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] }),
            transform: getTransform,
          },
        ]}
      >
        {children}
      </Animated.View>
    </OverlayView>
  );
};

export default React.forwardRef(OverlayPullView);
