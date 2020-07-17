import React, { useRef, useMemo } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Image,
  ImageSourcePropType,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ImageStyle,
} from 'react-native';

const styles = StyleSheet.create({
  carousel: {
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: 0,
  },
});

export interface CarouselImageProps {
  images: ImageSourcePropType[];
  onScroll?: (value: number) => void;
  onItemSelected?: (index: number) => void;
  onItemPress?: (index: number) => void;
  width?: number;
  height?: number;
  imageStyle?: StyleProp<ImageStyle>;
}

const COLORS = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'];
const COUNT = COLORS.length;

const Carousel: React.FC<CarouselImageProps> = ({
  images = [],
  onScroll,
  onItemSelected,
  onItemPress,
  width = __WIDTH__,
  height = toDP(120),
  imageStyle,
}) => {
  const _length = images.length;
  const translateXValue = useRef(new Animated.Value(-width)).current;

  let prevOffsetX = 0;
  let currentIndex = 0;

  const leftImageRef = useRef<Image>(null);
  const centerImageRef = useRef<Image>(null);
  const rightImageRef = useRef<Image>(null);

  const _panResponder = useRef(
    PanResponder.create({
      // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
      onStartShouldSetPanResponder: (_evt, _gestureState) => _length > 1,
      onStartShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // 如果 View 不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
      onMoveShouldSetPanResponder: (_evt, _gestureState) => _length > 1,
      onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
      // View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。
      onPanResponderGrant: (_evt, _gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0

        translateXValue.stopAnimation();
        // @ts-ignore
        prevOffsetX = translateXValue._value;
      },
      // 响应者现在“另有其人”而且暂时不会“放权”，请另作安排。
      onPanResponderReject: (_evt, _gestureState) => {},
      // 用户正在屏幕上移动手指
      onPanResponderMove: (_evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        const { dx } = gestureState;
        let value = prevOffsetX + dx;
        translateXValue.setValue(value);

        onScroll && onScroll(-value);
      },
      // 触摸操作结束时触发
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        onPanResponderRelease(evt, gestureState);
      },
      // 有其他组件请求接替响应者，当前的 View 是否“放权”？返回 true 的话则释放响应者权力
      onPanResponderTerminationRequest: (_evt, _gestureState) => true,
      // 响应者权力已经交出 , 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: (evt, gestureState) => {
        onPanResponderRelease(evt, gestureState);
      },
      onShouldBlockNativeResponder: (_evt, _gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    }),
  ).current;

  const onPanResponderRelease = (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const { dx, vx } = gestureState;

    // 判断是滑动还是点击
    if (Math.abs(dx) > 0) {
      let value = prevOffsetX + dx;
      let index = currentIndex;
      // 判断是否惯性滑动
      if (Math.abs(vx) > 0.3) {
        if (dx < 0) {
          // 惯性向右
          index = Math.floor(value / width);
        }
        if (dx > 0) {
          // 惯性向左
          index = Math.ceil(value / width);
        }
      } else {
        index = Math.round(value / width);
      }
      Animated.spring(translateXValue, {
        toValue: width * index,
        velocity: 0, // 初始速度，默认0
        // tension: 9, // 张力系数，默认7
        // friction: 9, // 摩擦系数，默认40
        bounciness: 3, // 反弹系数,默认8
        speed: 9, // 速度，默认12
        useNativeDriver: false,
      }).start(() => {
        if (prevOffsetX === width * index) {
          return;
        }
        if (Math.abs(index) === 2) {
          // 向右滑动
          currentIndex = (currentIndex + 1) % _length;
        }
        if (Math.abs(index) === 0) {
          // 向左滑动
          currentIndex = (currentIndex + _length - 1) % _length;
        }
        onItemSelected && onItemSelected(currentIndex);

        const source = __ANDROID__ ? 'src' : 'source';
        leftImageRef.current?.setNativeProps({ [source]: [images[(currentIndex + _length - 1) % _length]] });
        centerImageRef.current?.setNativeProps({ [source]: [images[currentIndex]] });
        rightImageRef.current?.setNativeProps({ [source]: [images[(currentIndex + 1) % _length]] });

        translateXValue.setValue(-width);
      });
    } else {
      console.warn(currentIndex % _length);
      onItemPress && onItemPress(currentIndex % _length);
    }
  };

  const buildImageStyle = useMemo(() => {
    return StyleSheet.flatten([styles.image, { width: width, height: height }, imageStyle]);
  }, [height, imageStyle, width]);
  return (
    <View style={[styles.carousel, { width: width, height: height, display: _length <= 0 ? 'none' : 'flex' }]}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: translateXValue }],
        }}
        {..._panResponder.panHandlers}
      >
        <Image
          ref={leftImageRef}
          style={[buildImageStyle, { left: 0, backgroundColor: COLORS[(currentIndex + COUNT - 1) % COUNT] }]}
          source={images[(currentIndex + _length - 1) % _length]}
        />
        <Image
          ref={centerImageRef}
          style={[buildImageStyle, { left: width, backgroundColor: COLORS[currentIndex] }]}
          source={images[currentIndex]}
        />
        <Image
          ref={rightImageRef}
          style={[buildImageStyle, { left: 2 * width, backgroundColor: COLORS[(currentIndex + 1) % COUNT] }]}
          source={images[(currentIndex + 1) % _length]}
        />
      </Animated.View>
    </View>
  );
};

export default Carousel;
