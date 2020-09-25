/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useImperativeHandle, useCallback, useMemo } from 'react';
import { Animated, StyleProp, ViewStyle, Easing, StyleSheet, LayoutRectangle, View } from 'react-native';
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
  type?: 'zoomIn' | 'zoomOut' | 'custom';
  customBounds?: LayoutRectangle;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface OverlayPopViewHandles extends OverlayViewHandles {}

const OverlayPopView: React.ForwardRefRenderFunction<OverlayPopViewHandles, OverlayPopViewProps> = (
  { style, containerStyle, type = 'zoomOut', customBounds, children, onCloseRequest, display = false, ...restProps },
  ref,
) => {
  const overlayViewRef = useRef<OverlayViewHandles>(null);
  const animationValue = useRef({
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
    scaleX: new Animated.Value(1),
    scaleY: new Animated.Value(1),
  }).current;
  const viewLayoutRef = useRef<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  const getFromBounds = useCallback(() => {
    let bounds;
    if (type === 'custom' && !customBounds) {
      console.error('OverlayPopView: customBounds can not be null when type is "custom"');
    }
    if (type === 'custom' && customBounds) {
      bounds = customBounds;
    } else {
      let zoomRate = type === 'zoomIn' ? 0.3 : 1.2;
      let { x, y, width, height } = viewLayoutRef.current;
      bounds = {
        x: x - (width * zoomRate - width) / 2,
        y: y - (height * zoomRate - height) / 2,
        width: width * zoomRate,
        height: height * zoomRate,
      };
    }
    return bounds;
  }, [customBounds, type]);

  const getFromTransform = useCallback(() => {
    const fb = getFromBounds();

    const tb = viewLayoutRef.current;
    const transform = {
      translateX: fb.x + fb.width / 2 - (tb.x + tb.width / 2),
      translateY: fb.y + fb.height / 2 - (tb.y + tb.height / 2),
      scaleX: fb.width / tb.width,
      scaleY: fb.height / tb.height,
    };
    return transform;
  }, [getFromBounds]);

  const showAnimation = useCallback(
    (callback?: Function) => {
      const { translateX, translateY, scaleX, scaleY } = getFromTransform();

      animationValue.opacity.setValue(0);
      animationValue.translateX.setValue(translateX);
      animationValue.translateY.setValue(translateY);
      animationValue.scaleX.setValue(scaleX);
      animationValue.scaleY.setValue(scaleY);
      Animated.parallel([
        Animated.timing(animationValue.opacity, { toValue: 1, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.translateX, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.translateY, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.scaleX, { toValue: 1, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.scaleY, { toValue: 1, duration: 200, useNativeDriver: false }),
      ]).start(() => callback && callback());
    },
    [
      getFromTransform,
      animationValue.opacity,
      animationValue.scaleX,
      animationValue.scaleY,
      animationValue.translateX,
      animationValue.translateY,
    ],
  );

  const dismissAnimation = useCallback(
    (callback?: Function) => {
      const { translateX, translateY, scaleX, scaleY } = getFromTransform();

      Animated.parallel([
        Animated.timing(animationValue.opacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.translateX, { toValue: translateX, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.translateY, { toValue: translateY, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.scaleX, { toValue: scaleX, duration: 200, useNativeDriver: false }),
        Animated.timing(animationValue.scaleY, { toValue: scaleY, duration: 200, useNativeDriver: false }),
      ]).start(() => callback && callback());
    },
    [
      getFromTransform,
      animationValue.opacity,
      animationValue.scaleX,
      animationValue.scaleY,
      animationValue.translateX,
      animationValue.translateY,
    ],
  );

  // 是否显示
  const isVisible = useCallback(() => (overlayViewRef.current ? overlayViewRef.current.isVisible() : false), []);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      overlayViewRef.current?.show(() => {
        showAnimation(callback);
      });
    },
    [showAnimation],
  );

  // 消失
  const dismiss = useCallback(
    (callback?: Function) => {
      onCloseRequest && onCloseRequest();
      dismissAnimation(() => {
        overlayViewRef.current?.dismiss();
        callback && callback();
      });
    },
    [dismissAnimation, onCloseRequest],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => {
    return { isVisible, show, dismiss };
  });

  return (
    <OverlayView
      ref={overlayViewRef}
      style={[type !== 'custom' && styles.overlayView, style]}
      onCloseRequest={dismiss}
      {...restProps}
    >
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          {
            opacity: animationValue.opacity,
            transform: [
              { translateX: animationValue.translateX },
              { translateY: animationValue.translateY },
              { scaleX: animationValue.scaleX },
              { scaleY: animationValue.scaleY },
            ],
          },
        ]}
        pointerEvents="box-none"
        onLayout={({ nativeEvent: { layout } }) => {
          viewLayoutRef.current = layout;
          display && show();
        }}
      >
        {children}
      </Animated.View>
    </OverlayView>
  );
};

export default React.forwardRef(OverlayPopView);
