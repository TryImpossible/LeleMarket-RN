import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  PanResponder,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import WheelItem from './WheelItem';

const styles = StyleSheet.create({
  wheel: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
  dragDistance?: number;
}

const Wheel: React.FC<WheelProps> = ({
  data = Array.from({ length: 30 }).map((_item, index) => `${index}`),
  selectedIndex = 0,
  textSize = 16,
  textColor = 'black',
  selectedTextColor = 'red',
  isShowDivider = true,
  dividerColor = '#ccc',
  dividerHeight = 0.5,
  visibleItems = 7,
  itemHeight = 40,
  // isCurved = true,
  onChange = (position) => {
    console.log('position is ' + position);
  },
  dragDistance = 160,
}) => {
  const _visibleItems = useRef(visibleItems % 2 === 0 ? visibleItems + 1 : visibleItems).current; // 判断visibleItems是否为奇数

  const translateYValue = useRef(new Animated.Value(itemHeight * -(selectedIndex - Math.floor(_visibleItems / 2))))
    .current; // translateY初始值，受selectedIndex控制
  let translateYListener = useRef<string>(null).current;

  const viewRef = useRef<View>(null);
  let wheelPageY = useRef(0).current; // wheel相对于屏幕的纵坐标
  let wheelContainerHeight = useRef(itemHeight * _visibleItems).current; // wheel容器的高度
  let wheelContentHeight = useRef(itemHeight * data.length).current; // wheel内容的高度

  const maxTop = useRef(itemHeight * Math.floor(_visibleItems / 2) + dragDistance).current; // 下拉的阀值，即向下滑动的最大值
  const maxBottom = useRef(-(wheelContentHeight - wheelContainerHeight + maxTop)).current; // 上拉的阀值，即向上滑动的最大值
  let prevTranslateY = 0; // 先前纵向移动的距离

  const _onChange = useCallback(
    (position) => {
      onChange(position);
    },
    [onChange],
  );

  const _panResponder = useRef(
    PanResponder.create({
      // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
      onStartShouldSetPanResponder: (_evt, _gestureState) => true,
      onStartShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // 如果 View 不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。
      onPanResponderGrant: (_evt, _gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0

        translateYValue.stopAnimation();
        if (translateYListener != null) {
          translateYValue.removeListener(translateYListener);
          translateYListener = null;
        }
        // @ts-ignore
        prevTranslateY = translateYValue._value;
      },
      // 响应者现在“另有其人”而且暂时不会“放权”，请另作安排。
      onPanResponderReject: (_evt, _gestureState) => {},
      // 用户正在屏幕上移动手指
      onPanResponderMove: (_evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        const { dy } = gestureState;
        let value = prevTranslateY + dy;
        if (value > 0) {
          value = Math.min(value, maxTop);
        } else {
          value = Math.max(value, maxBottom);
        }
        translateYValue.setValue(value);
      },
      // 触摸操作结束时触发
      onPanResponderRelease: (_evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。

        const { y0, dy, vy } = gestureState;

        // 通过dy, 判断是惯性滑动还是点击
        if (Math.abs(dy) > 0) {
          /// 惯性滑动
          let value = prevTranslateY + dy;
          if (value > 0) {
            value = Math.min(value, maxTop);
          } else {
            value = Math.max(value, maxBottom);
          }

          translateYListener = translateYValue.addListener(({ value: val }) => {
            if (val > maxTop - dragDistance) {
              translateYValue.removeListener(translateYListener as string);
              translateYListener = null;

              Animated.spring(translateYValue, {
                toValue: maxTop - dragDistance,
                friction: 9,
                useNativeDriver: false,
              }).start(() => {
                _onChange(0);
              });
            } else if (val < maxBottom + dragDistance) {
              translateYValue.removeListener(translateYListener as string);
              translateYListener = null;

              Animated.spring(translateYValue, {
                toValue: maxBottom + dragDistance,
                friction: 9,
                useNativeDriver: false,
              }).start(() => {
                _onChange(data.length - 1);
              });
            }
          });

          Animated.sequence([
            Animated.spring(translateYValue, { toValue: value, friction: 9, useNativeDriver: false }),
            Animated.decay(translateYValue, { velocity: vy, useNativeDriver: false }),
          ]).start(() => {
            // @ts-ignore
            const val = translateYValue._value;
            if (val <= maxTop - dragDistance && val >= maxBottom + dragDistance) {
              const position = Math.round(val / itemHeight);
              translateYValue.setValue(position * itemHeight);
              _onChange(Math.floor(_visibleItems / 2) - position);
            }
          });
        } else {
          /// 点击
          const position = Math.round((y0 - wheelPageY - prevTranslateY) / itemHeight) - 1;

          if (position > -1 && position < data.length) {
            Animated.spring(translateYValue, {
              toValue: -itemHeight * (position - Math.floor(_visibleItems / 2)),
              friction: 9,
              useNativeDriver: false,
            }).start(() => {
              _onChange(position);
            });
          }
        }
      },
      // 有其他组件请求接替响应者，当前的 View 是否“放权”？返回 true 的话则释放响应者权力
      onPanResponderTerminationRequest: (_evt, _gestureState) => true,
      // 响应者权力已经交出 , 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: (_evt, _gestureState) => {},
      onShouldBlockNativeResponder: (_evt, _gestureState) => {
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
        viewRef.current?.measureInWindow((_x, y, _width, height) => {
          wheelPageY = y;
          wheelContainerHeight = height;
        });
      }}
      {..._panResponder.panHandlers}
      removeClippedSubviews
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
      {/* 遮罩1 */}
      <View style={[styles.mask, { bottom: itemHeight * Math.ceil(visibleItems / 2) }]} />
      {/* 遮罩2 */}
      <View style={[styles.mask, { top: itemHeight * Math.ceil(visibleItems / 2) }]} />
      {/* 分隔线1 */}
      {isShowDivider && <View style={[dividerStyle, { bottom: itemHeight * Math.ceil(visibleItems / 2) }]} />}
      {/* 分隔线2 */}
      {isShowDivider && <View style={[dividerStyle, { top: itemHeight * Math.ceil(visibleItems / 2) }]} />}
    </View>
  );
};

export default Wheel;
