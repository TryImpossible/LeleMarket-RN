import React, { useRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { View, StyleProp, ViewStyle, LayoutRectangle, Animated, FlexAlignType } from 'react-native';
import OverlayView, { OverlayViewProps, OverlayViewHandles } from './OverlayView';
import Popover, { ArrowType } from '../Popover';

export interface OverlayPopoverViewProps extends OverlayViewProps {
  popoverStyle?: StyleProp<ViewStyle>;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'middle' | 'end';
  relativeNodeRef?: React.MutableRefObject<View>;
}

export interface OverlayPopoverViewHandle extends OverlayViewHandles {}

const OverlayPopoverView: React.ForwardRefRenderFunction<OverlayPopoverViewHandle, OverlayPopoverViewProps> = (
  {
    style,
    popoverStyle,
    relativeNodeRef,
    children,
    onCloseRequest,
    display = false,
    direction = 'bottom',
    align = 'end',
    ...restProps
  },
  ref,
) => {
  const overlayViewRef = useRef<OverlayViewHandles>(null);
  const viewLayoutRef = useRef<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const relativeNodeLayoutRef = useRef<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const {
    opacity: opacityValue,
    translateX: translateXValue,
    translateY: translateYValue,
    width: widthValue,
    height: heightValue,
  } = useRef({
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
    width: new Animated.Value(-1),
    height: new Animated.Value(-1),
  }).current;

  const _onLayout = ({ nativeEvent: { layout } }) => {
    viewLayoutRef.current = layout;
    relativeNodeRef.current?.measureInWindow((x, y, width, height) => {
      const { x: x1, y: y1, width: w1, height: h1 } = relativeNodeLayoutRef.current;
      if (x1 === x && y1 === y && w1 === width && h1 === height) {
        return;
      }
      relativeNodeLayoutRef.current = { x, y, width, height };

      const position = {
        top: {
          start: { x, y: -(__HEIGHT__ - y) },
          middle: { x: x - __WIDTH__ / 2 + width / 2, y: -(__HEIGHT__ - y) },
          end: { x: -(__WIDTH__ - x - width), y: -(__HEIGHT__ - y) },
        },
        right: {
          start: { x: x + width, y },
          middle: { x: x + width, y: -(__HEIGHT__ / 2 - (y + height / 2)) },
          end: { x: x + width, y: -(__HEIGHT__ - y - height) },
        },
        bottom: {
          start: { x, y: y + height },
          middle: { x: x - __WIDTH__ / 2 + width / 2, y: y + height },
          end: { x: -(__WIDTH__ - x - width), y: y + height },
        },
        left: {
          start: { x: -(__WIDTH__ - x), y },
          middle: { x: -(__WIDTH__ - x), y: -(__HEIGHT__ / 2 - (y + height / 2)) },
          end: { x: -(__WIDTH__ - x), y: -(__HEIGHT__ - y - height) },
        },
      };

      // console.warn(x, y, width, height);
      // console.warn(position[direction][align].x, position[direction][align].y);

      translateXValue.setValue(position[direction][align].x);
      translateYValue.setValue(position[direction][align].y);
    });
    display && show();
  };

  const _showAnimation = useCallback(
    (callback?: Function) => {
      Animated.parallel([
        Animated.timing(opacityValue, { toValue: 1, duration: 200, useNativeDriver: false }),
        Animated.timing(widthValue, {
          toValue: viewLayoutRef.current?.width,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(heightValue, {
          toValue: viewLayoutRef.current?.height,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => callback && callback());
    },
    [heightValue, opacityValue, widthValue],
  );

  const _dismissAnimation = useCallback(
    (callback?: Function) => {
      Animated.parallel([
        Animated.timing(opacityValue, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(widthValue, { toValue: -1, duration: 200, useNativeDriver: false }),
        Animated.timing(heightValue, { toValue: -1, duration: 200, useNativeDriver: false }),
      ]).start(() => callback && callback());
    },
    [heightValue, opacityValue, widthValue],
  );

  // 是否显示
  const isVisible = useCallback(() => (overlayViewRef.current ? overlayViewRef.current.isVisible() : false), []);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      overlayViewRef.current?.show(() => {
        _showAnimation(callback);
      });
    },
    [_showAnimation],
  );

  // 消失
  const dismiss = useCallback(
    (callback?: Function) => {
      onCloseRequest && onCloseRequest();
      _dismissAnimation(() => {
        overlayViewRef.current?.dismiss();
        callback && callback();
      });
    },
    [_dismissAnimation, onCloseRequest],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => {
    return { isVisible, show, dismiss };
  });

  // 获取Popover的箭头位置
  const _arrow = useMemo(() => {
    const position = {
      top: {
        start: 'bottomLeft',
        middle: 'bottom',
        end: 'bottomRight',
      },
      right: {
        start: 'leftTop',
        middle: 'left',
        end: 'leftBottom',
      },
      bottom: {
        start: 'topLeft',
        middle: 'top',
        end: 'topRight',
      },
      left: {
        start: 'rightTop',
        middle: 'right',
        end: 'rightBottom',
      },
    };
    return position[direction][align] as ArrowType;
  }, [align, direction]);

  // 决定起始的位置，左边、中间、右边，即translateX、translateY
  const _alignItems = useMemo(() => {
    return {
      start: 'flex-start',
      middle: 'center',
      end: 'flex-end',
    }[align] as FlexAlignType;
  }, [align]);

  // 决定排列方向
  const _flexDirection = useMemo(() => {
    return {
      top: 'column-reverse',
      right: 'row',
      bottom: 'column',
      left: 'row-reverse',
    }[direction] as 'row' | 'column' | 'row-reverse' | 'column-reverse';
  }, [direction]);

  return (
    <OverlayView
      ref={overlayViewRef}
      style={[style, { flexDirection: _flexDirection, alignItems: _alignItems }]}
      onCloseRequest={dismiss}
      {...restProps}
    >
      <Animated.View
        style={
          [
            {
              opacity: opacityValue,
              width: widthValue,
              height: heightValue,
              transform: [{ translateX: translateXValue }, { translateY: translateYValue }],
              overflow: 'hidden',
            },
          ] as StyleProp<ViewStyle>
        }
        onLayout={_onLayout}
      >
        <Popover style={[popoverStyle]} arrow={_arrow}>
          {children}
        </Popover>
      </Animated.View>
    </OverlayView>
  );
};

export default React.forwardRef(OverlayPopoverView);
