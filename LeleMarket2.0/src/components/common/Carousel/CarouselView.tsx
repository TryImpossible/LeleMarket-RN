import React, { useRef, useCallback, useImperativeHandle } from 'react';
import {
  ScrollView,
  View,
  ScrollViewProps,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';

export interface CarouselViewHandles {
  scrollToPage: (index: number, animated?: boolean) => void;
  scrollToPreviousPage: (animated?: boolean) => void;
  scrollToNextPage: (animated?: boolean) => void;
}

export interface CarouselViewProps extends ScrollViewProps {
  children?: React.ReactNode;
  cycle?: boolean; // 是否循环
  carousel?: boolean; // 是否开启轮播
  initialIndex?: number; // 起始的位置，从0开始
  direction?: 'forward' | 'backward'; //轮播方向
  interval?: number; // 每页停留的时间
  onChange?: (index: number) => void; // 页面改变的回调
  control?: boolean | React.ReactNode; // 指示器
}

const CarouselView: React.ForwardRefRenderFunction<CarouselViewHandles, CarouselViewProps> = (
  {
    children,
    cycle = true,
    carousel = false,
    initialIndex = 0,
    direction = 'forward',
    interval = 1000,
    onChange,
    horizontal = true,
    onLayout,
    onScroll,
    onTouchStart,
    onTouchEnd,
    ...rest
  },
  ref,
) => {
  const _scrollViewRef = useRef<ScrollView>(null);
  let _width = useRef(0); // 容器的宽度
  let _height = useRef(0); // 容器的高度
  const _pageCount = useRef(children ? (Array.isArray(children) ? children.length : 1) : 0).current; // 页面的数量
  const _cycle = useRef(cycle && _pageCount > 1).current; // 是否循环，_pageCount > 1 && cycle === true
  const _carousel = useRef(carousel && _pageCount > 1).current; // 是否轮播，_pageCount > 1 && carousel === true
  const _cardCount = useRef(_cycle ? _pageCount + 2 : _pageCount).current; // 轮播中的卡片序列，如为循环播放则首尾各多一页，如页面为0-1-2，则cards为2-0-1-2-0
  let _pageIndex = useRef(initialIndex); // 页面的位置，initialIndex
  let _cardIndex = useRef(_cycle ? _pageIndex.current + 1 : _pageIndex.current); // 位置，默认为initialIndex，多页则initialIndex + 1
  const _pathValue = useRef(new Animated.Value(0)).current; // 显示的动画，Android实现initialIndex的时候页面会闪动，用动画来解决
  let _timer = useRef<NodeJS.Timeout>(); // 轮播的定时器

  /**
   * 滚动至offset
   * @param offset 偏移量
   * @param animated 是否开启动画
   */
  const scrollTo = useCallback(
    (offset = 0, animated = false) => {
      if (horizontal) {
        _scrollViewRef.current?.scrollTo({ y: 0, x: offset, animated });
      } else {
        _scrollViewRef.current?.scrollTo({ y: offset, x: 0, animated });
      }
    },
    [horizontal],
  );

  /**
   * 滚动至卡片位置
   * @param cardIndex 位置
   * @param animated 是否开启动画
   */
  const scrollToCard = useCallback(
    (cardIndex, animated = false) => {
      const offset = horizontal ? _width.current * cardIndex : _height.current * cardIndex;
      scrollTo(offset, animated);
    },
    [horizontal, scrollTo],
  );

  /**
   * 移除定时器
   */
  const _removeTimer = useCallback(() => {
    if (_timer.current) {
      clearInterval(_timer.current);
      _timer.current = undefined;
    }
  }, []);

  /**
   * 使用定时器实现自动轮播
   */
  const _setupTimer = useCallback(() => {
    _removeTimer();
    if (!_carousel) {
      return;
    }
    _timer.current = setInterval(() => {
      if (direction === 'forward') {
        scrollToCard(_cardIndex.current + 1, true);
      } else {
        scrollToCard(_cardIndex.current - 1, true);
      }
    }, interval);
  }, [_removeTimer, _carousel, direction, interval, scrollToCard]);

  /**
   * 渲染视图
   */
  const _renderCards = () => {
    const cards = [];
    if (!Array.isArray(children)) {
      children = [children];
    }
    if (Array.isArray(children)) {
      children.map((child, index) => cards.push(<View key={`view-${index}`}>{child}</View>));
      if (_cycle && children.length > 1) {
        cards.unshift(<View key={'view-head'}>{children[children.length - 1]}</View>);
        cards.push(<View key={'view-tail'}>{children[0]}</View>);
      }
    }
    return cards;
  };

  /**
   * 布局渲染的回调
   */
  const _onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { width, height },
        },
      } = event;
      onLayout && onLayout(event);
      if (width !== _width.current || height !== _height.current) {
        // 动态获取容器的宽高
        _width.current = width;
        _height.current = height;

        scrollToCard(_cardIndex.current);

        // 实现initialIndex后，再使用动画显示，防止闪屏
        Animated.timing(_pathValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start(() => _setupTimer());
      }
    },
    [onLayout, scrollToCard, _pathValue, _setupTimer],
  );

  /**
   * 滚动的回调
   */
  const _onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        nativeEvent: {
          contentOffset: { x: offsetX, y: offsetY },
          // layoutMeasurement: { width, height },
          // contentSize: { width: contentWidth },
        },
      } = event;

      onScroll && onScroll(event);

      let cardIndex = _cardIndex.current;
      if (horizontal) {
        cardIndex = Math.round(offsetX / _width.current);
      } else {
        cardIndex = Math.round(offsetY / _height.current);
      }

      if (_cycle && cardIndex === _cardCount - 1) {
        cardIndex = 1;
        scrollToCard(cardIndex);
      }
      if (_cycle && cardIndex === 0) {
        cardIndex = _cardCount - 2;
        scrollToCard(cardIndex);
      }

      _cardIndex.current = cardIndex;
      const pageIndex = _cycle ? (cardIndex + _pageCount - 1) % _pageCount : cardIndex;
      _pageIndex.current = pageIndex;
      onChange && onChange(pageIndex);
    },
    [_cardCount, _cycle, _pageCount, horizontal, onChange, onScroll, scrollToCard],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(
    ref,
    () => ({
      scrollToPage: (index, animated = true) => scrollToCard(_cycle ? index + 1 : index, animated),
      scrollToPreviousPage: (animated = true) => scrollToCard(_cardIndex.current - 1, animated),
      scrollToNextPage: (animated = true) => scrollToCard(_cardIndex.current + 1, animated),
    }),
    [_cycle, scrollToCard],
  );

  return (
    <Animated.View style={{ opacity: _pathValue }}>
      <ScrollView
        ref={_scrollViewRef}
        horizontal={horizontal}
        pagingEnabled
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        scrollsToTop={false}
        onLayout={_onLayout}
        onScroll={_onScroll}
        onTouchStart={(event) => {
          _removeTimer();
          onTouchStart && onTouchStart(event);
        }}
        onTouchEnd={(event) => {
          _setupTimer();
          onTouchEnd && onTouchEnd(event);
        }}
        {...rest}
      >
        {_renderCards()}
      </ScrollView>
    </Animated.View>
  );
};

export default React.forwardRef(CarouselView);
