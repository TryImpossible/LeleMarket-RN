import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  PanResponder,
  NativeTouchEvent,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import WheelItem from './WheelItem';
import { types } from '@babel/core';

const styles = StyleSheet.create({
  wheel: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

interface WheelProps {
  style?: StyleProp<ViewStyle>;
  data: string[];
  selectedIndex?: number;
  textSize?: number;
  textColor?: string;
  selectedTextColor?: string;
  isShowDivider?: boolean;
  dividerColor?: string;
  dividerHeight?: number;
  visibleItems?: number;
  itemHeight?: number;
  isCurved?: boolean;
  onChange?: (position: number) => void;
}

const Wheel: React.FC<WheelProps> = ({
  data = Array.from({ length: 60 }).map((_item, index) => `${index}`),
  selectedIndex = 0,
  textSize = 16,
  textColor = 'black',
  selectedTextColor = 'red',
  isShowDivider = true,
  dividerColor = 'blue',
  dividerHeight = StyleSheet.hairlineWidth,
  visibleItems = 7,
  itemHeight = 40,
  isCurved = true,
  onChange = (position) => {
    console.log(position);
  },
}) => {
  const translateYValue = React.useRef(new Animated.Value(0)).current;

  const viewRef = React.useRef<View>(null);
  let wheelPageY = 0; // wheel相对于屏幕的纵坐标
  let wheelContainerHeight = 0; // wheel容器的高度
  let wheelContentHeight = 0; // wheel内容的高度
  let lastY = 0;
  let prevTouchTime = 0;

  React.useEffect(() => {
    const listener = translateYValue.addListener(({ value }) => {
      if (value > itemHeight) {
        translateYValue.setValue(0);
      }
      if (value < wheelContainerHeight - wheelContentHeight - itemHeight) {
        translateYValue.setValue(wheelContainerHeight - wheelContentHeight);
      }
    });
    return () => translateYValue.removeListener(listener);
  }, []);

  const _panResponder = React.useRef(
    PanResponder.create({
      // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
      onStartShouldSetPanResponder: (_evt, _gestureState) => true,
      onStartShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // 如果 View 不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。
      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0

        translateYValue.stopAnimation(() => {
          // @ts-ignore
          lastY = translateYValue._value;

          const {
            nativeEvent: { touches, locationX, locationY, pageX, pageY, timestamp },
          } = evt;
          // const position = Math.ceil((pageY - wheelPageY - lastY) / itemHeight);

          prevTouchTime = timestamp;
        });
      },
      // 响应者现在“另有其人”而且暂时不会“放权”，请另作安排。
      onPanResponderReject: (_evt, _gestureState) => {},
      // 用户正在屏幕上移动手指
      onPanResponderMove: (_evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        const { dy } = gestureState;
        const value = lastY + dy;
        translateYValue.setValue(value);
      },
      // 触摸操作结束时触发
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。

        const { y0, dy, vy } = gestureState;
        // 通过dy, 判断是滑动还是点击
        if (Math.abs(dy) > 0) {
          let value = lastY + dy;

          if (Math.abs(vy) > 0.1) {
            Animated.parallel([
              Animated.spring(translateYValue, { toValue: value, friction: 9, useNativeDriver: false }),
              Animated.decay(translateYValue, { velocity: vy, useNativeDriver: false }),
            ]).start(() => {
              // @ts-ignore
              const position = Math.round(translateYValue._value / itemHeight);
              translateYValue.setValue(position * itemHeight);
              onChange(Math.abs(position) + Math.ceil(visibleItems / 2) - 1);
            });
          } else {
            // Animated.spring(translateYValue, { toValue: value, friction: 9, useNativeDriver: false }).start(() => {
            //   // @ts-ignore
            //   const position = Math.round(translateYValue._value / itemHeight);
            //   translateYValue.setValue(position * itemHeight);
            //   onChange(Math.abs(position) + Math.ceil(visibleItems / 2) - 1);
            // });
          }
        } else {
          const {
            nativeEvent: { pageY },
          } = evt;
          const position = Math.round((pageY - wheelPageY - lastY) / itemHeight);

          Animated.spring(translateYValue, {
            toValue: -itemHeight * (position - Math.ceil(visibleItems / 2)),
            friction: 9,
            useNativeDriver: false,
          }).start(() => {
            onChange(position - 1);
          });
        }
      },
      // 有其他组件请求接替响应者，当前的 View 是否“放权”？返回 true 的话则释放响应者权力
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // 响应者权力已经交出 , 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    }),
  ).current;

  const dividerStyle = [styles.divider, { backgroundColor: dividerColor, height: dividerHeight }];
  return (
    <View
      style={[styles.wheel, { height: itemHeight * visibleItems }]}
      ref={viewRef}
      onLayout={() => {
        viewRef.current?.measure((_x, _y, _width, height, _pageX, pageY) => {
          wheelPageY = pageY;
          wheelContainerHeight = height;
        });
      }}
      removeClippedSubviews
      {..._panResponder.panHandlers}
    >
      <Animated.View
        style={{ transform: [{ translateY: translateYValue }] }}
        onLayout={(e: LayoutChangeEvent) => {
          wheelContentHeight = e.nativeEvent.layout.height;
        }}
      >
        {data.map((item: string, index: number) => (
          <WheelItem
            key={String(index)}
            data={item}
            height={itemHeight}
            textSize={textSize}
            textColor={textColor}
            selectedTextColor={selectedTextColor}
          />
        ))}
      </Animated.View>
      <View style={[styles.mask, { top: itemHeight * Math.ceil(visibleItems / 2) }]} />
      <View style={[styles.mask, { bottom: itemHeight * Math.ceil(visibleItems / 2) }]} />
      {isShowDivider && <View style={[dividerStyle, { top: itemHeight * ((visibleItems - 1) / 2) }]} />}
      {isShowDivider && <View style={[dividerStyle, { bottom: itemHeight * ((visibleItems - 1) / 2) }]} />}
    </View>
  );
};

export default Wheel;
