'use strict';

import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, ImageURISource, ImageRequireSource, ScrollView } from 'react-native';
import Scene from './Scene';

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export type IconType = ImageURISource | ImageRequireSource;

export interface RouteProps {
  key: string;
  title: string;
  icon?: IconType;
  badge?: number;
}

export interface PagerProps {
  route: RouteProps;
  index: number;
}

export interface MyViewPagerProps {
  style?: StyleProp<ViewStyle>;
  routes: Array<RouteProps>;
  onIndexChange?: (index: number, callback: () => void) => void;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  renderScene: ({ route, index }: PagerProps) => React.ReactNode;
  bounces?: boolean;
  lazy?: boolean;
  lazyPreloadDistance?: number;
  renderLazyPlaceholder?: () => React.ReactNode;
  keyboardDismissMode?: 'none' | 'on-drag';
  swipeEnabled?: boolean;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onPagerScroll?: (position: number, offset: number) => void;
  initialIndex?: number;
}

class MyViewPager extends Component<MyViewPagerProps> {
  static defaultProps = {
    lazy: true,
    swipeEnabled: true,
    initialIndex: 0,
    renderLazyPlaceholder: () => null,
    keyboardDismissMode: 'on-drag',
  };

  scrollViewRef: React.RefObject<ScrollView>;
  contentWidth: number;
  timer: NodeJS.Timeout | null;
  viewPagerRef: React.RefObject<ViewPager>;
  sceneRefs: { [key: number]: any };
  visibleSceneIndexs: Array<number>;
  selectedIndex: number;

  constructor(props: MyViewPagerProps) {
    super(props);
    const { initialIndex = 0 } = props;
    this.scrollViewRef = React.createRef<ScrollView>();
    this.contentWidth = 0;
    this.timer = null;
    this.viewPagerRef = React.createRef<ViewPager>();
    this.sceneRefs = {};
    this.visibleSceneIndexs = [initialIndex];
    this.selectedIndex = initialIndex;
  }

  componentDidMount() {
    // NOTE: 实现initialPage功能
    const { initialIndex = 0 } = this.props;
    if (initialIndex > 0) {
      this.timer = setTimeout(() => {
        this.scrollViewRef.current && this.scrollViewRef.current.scrollTo({ x: this.contentWidth, animated: false });
      }, 0);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.sceneRefs = [];
    this.visibleSceneIndexs = [];
  }

  scrollToIndex(index: number) {
    if (index === this.selectedIndex) {
      return;
    }
    if (this.viewPagerRef.current) {
      const animated = Math.abs(index - this.selectedIndex) === 1;
      if (animated) {
        this.viewPagerRef.current.setPage(index);
      } else {
        this.viewPagerRef.current.setPageWithoutAnimation(index);
      }
    }

    this.selectedIndex = index;
    if (!this.visibleSceneIndexs.includes(index)) {
      this.sceneRefs[index] && this.sceneRefs[index].onVisibilityLoad();
    }
  }

  render() {
    const {
      style,
      routes,
      onIndexChange,
      renderScene,
      swipeEnabled,
      onPagerScroll,
      onSwipeStart,
      onSwipeEnd,
      initialIndex,
      bounces,
      lazy,
      sceneContainerStyle,
      renderLazyPlaceholder,
      keyboardDismissMode,
    } = this.props;
    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={[styles.viewPager, StyleSheet.flatten(style)]}
        // keyboardShouldPersistTaps="always"
        horizontal
        bounces={bounces}
        scrollEnabled={swipeEnabled}
        pagingEnabled
        alwaysBounceHorizontal
        keyboardDismissMode={keyboardDismissMode}
        showsHorizontalScrollIndicator={false}
        // scrollEventThrottle={16}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          this.contentWidth = width;
        }}
        onScroll={({
          nativeEvent: {
            contentOffset: { x },
            layoutMeasurement: { width },
          },
        }) => {
          const position = Math.floor(x / width);
          const offset = x % width;
          onPagerScroll && onPagerScroll(position, offset);
        }}
        onMomentumScrollEnd={({
          nativeEvent: {
            contentOffset: { x },
            layoutMeasurement: { width },
          },
        }) => {
          const index = Math.floor(x / width);
          this.selectedIndex = index;
          if (!this.visibleSceneIndexs.includes(index)) {
            this.sceneRefs[index] && this.sceneRefs[index].onVisibilityLoad();
          }
          onIndexChange && onIndexChange(index, () => {});
        }}
      >
        {routes.map((route, index) => {
          return (
            <Scene
              key={`Scene${index}`}
              getRef={(ref) => {
                this.sceneRefs[index] = ref;
              }}
              style={sceneContainerStyle}
              placeholder={renderLazyPlaceholder && renderLazyPlaceholder()}
              visible={!lazy || index === initialIndex}
            >
              {renderScene({ route, index })}
            </Scene>
          );
        })}
      </ScrollView>
    );
  }
}

export default MyViewPager;
