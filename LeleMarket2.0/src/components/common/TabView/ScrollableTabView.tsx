import React, { Component } from 'react';
import { YellowBox, View, StyleSheet, StyleProp, ViewStyle, TextStyle, Animated, ScrollView } from 'react-native';
import ViewPager, { RouteProps, SceneProps } from './viewPager/MyViewPager';
import TabBar from './tabBar/TabBar';

YellowBox.ignoreWarnings([
  'irtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead',
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface ScrollableTabViewProps {
  style?: StyleProp<ViewStyle>;
  navigationState: Array<RouteProps>;
  renderTabBar?: (props: any) => React.ReactElement | null;

  tabBarStyle?: StyleProp<ViewStyle>;
  tabBarContentContainerStyle?: StyleProp<ViewStyle>;
  tabBarTabStyle?: StyleProp<ViewStyle>;
  tabBarLabelStyle?: StyleProp<TextStyle>;
  tabBarIndicatorStyle?: StyleProp<ViewStyle>;
  tabBarActiveColor?: string;
  tabBarInactiveColor?: string;
  scrollEnabled?: boolean;
  bounces?: boolean;
  onTabBarPress?: (index: number) => void;
  renderTabBarLabel?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderTabBarIcon?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderTabBarBadge?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderTabBarIndicator?: ({
    indexValue,
    leftValue,
    widthValue,
  }: {
    indexValue: Animated.Value;
    leftValue: Animated.Value;
    widthValue: Animated.Value;
  }) => React.ReactNode;
  renderTabBarLeftSection?: () => React.ReactNode;
  renderTabBarRightSection?: () => React.ReactNode;
  tabBarIndicatorMode?: 'tab' | 'label';
  tabBarIndicatorWidthRatio?: number;
  tabBarMode?: 'scrollable' | 'fixed';

  onIndexChange?: (index: number) => void;
  renderScene: ({ route, index, jumpTo }: SceneProps) => React.ReactNode;
  lazy?: boolean;
  // lazyPreloadDistance?: number;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  renderLazyPlaceholder?: () => React.ReactNode;
  keyboardDismissMode?: 'on-drag' | 'none';
  swipeEnabled?: boolean;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onPagerScroll?: (position: number, offset: number) => void;
  initialIndex?: number;
}

class ScrollableTabView extends Component<ScrollableTabViewProps> {
  scrollViewRef: React.RefObject<ScrollView> = React.createRef<ScrollView>();
  headerViewRef: React.RefObject<View> = React.createRef<View>();
  mainViewRef: React.RefObject<View> = React.createRef<View>();
  tabBarRef: React.RefObject<TabBar> = React.createRef<TabBar>();
  viewPagerRef: React.RefObject<ViewPager> = React.createRef<ViewPager>();

  static defaultProps = {
    tabBarPosition: 'top',
    scrollEnabled: true,
    bounces: true,
    lazy: true,
    swipeEnabled: true,
    initialIndex: 0,
    tabBarActiveColor: Colors.transparent,
    tabBarInactiveColor: Colors.transparent,
  };

  public jumpTo(position: number): void {
    this.tabBarRef.current && this.tabBarRef.current.scrollToIndex(position);
    this.viewPagerRef.current && this.viewPagerRef.current.scrollToIndex(position);
  }

  render() {
    const {
      style,
      renderTabBar,

      tabBarStyle,
      tabBarContentContainerStyle,
      tabBarTabStyle,
      tabBarLabelStyle,
      tabBarIndicatorStyle,
      tabBarActiveColor,
      tabBarInactiveColor,
      scrollEnabled,
      bounces,
      onTabBarPress,
      renderTabBarLabel,
      renderTabBarIcon,
      renderTabBarBadge,
      renderTabBarIndicator,
      renderTabBarLeftSection,
      renderTabBarRightSection,
      tabBarIndicatorMode,
      tabBarIndicatorWidthRatio,
      tabBarMode,

      navigationState,
      onIndexChange,
      renderScene,
      lazy,
      // lazyPreloadDistance,
      sceneContainerStyle,
      renderLazyPlaceholder,
      keyboardDismissMode,
      swipeEnabled,
      onSwipeStart,
      onSwipeEnd,
      onPagerScroll,
      initialIndex,
    } = this.props;
    const TabBarComponent = () => {
      if (renderTabBar) {
        return renderTabBar({
          ref: this.tabBarRef,
          routes: navigationState,
          onTabChange: (index: number) => {
            this.viewPagerRef.current && this.viewPagerRef.current.scrollToIndex(index);
          },
          initialIndex,
        });
      } else {
        return (
          <TabBar
            ref={this.tabBarRef}
            routes={navigationState}
            style={tabBarStyle}
            contentContainerStyle={tabBarContentContainerStyle}
            tabStyle={tabBarTabStyle}
            labelStyle={tabBarLabelStyle}
            renderLabel={renderTabBarLabel}
            renderIndicator={renderTabBarIndicator}
            activeColor={tabBarActiveColor}
            inactiveColor={tabBarInactiveColor}
            indicatorStyle={tabBarIndicatorStyle}
            renderIcon={renderTabBarIcon}
            renderBadge={renderTabBarBadge}
            onTabPress={(index) => {
              onTabBarPress && onTabBarPress(index);
            }}
            onTabChange={(index) => {
              this.viewPagerRef.current && this.viewPagerRef.current.scrollToIndex(index);
            }}
            initialIndex={initialIndex}
            scrollEnabled={scrollEnabled}
            bounces={bounces}
            renderLeftSection={renderTabBarLeftSection}
            renderRightSection={renderTabBarRightSection}
            indicatorMode={tabBarIndicatorMode}
            indicatorWidthRatio={tabBarIndicatorWidthRatio}
            tabMode={tabBarMode}
          />
        );
      }
    };

    return (
      <ScrollView
        ref={this.scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => {
          // console.warn('scrollView', width, height);
        }}
      >
        <View ref={this.headerViewRef} style={{ height: 500, backgroundColor: 'red' }} />
        <View ref={this.mainViewRef} style={[styles.container, style, { height: __HEIGHT__ }]}>
          <TabBarComponent />
          <ViewPager
            ref={this.viewPagerRef}
            routes={navigationState}
            sceneContainerStyle={sceneContainerStyle}
            initialIndex={initialIndex}
            lazy={lazy}
            // lazyPreloadDistance={lazyPreloadDistance}
            renderLazyPlaceholder={renderLazyPlaceholder}
            onIndexChange={(index, callback) => {
              this.tabBarRef.current && this.tabBarRef.current.scrollToIndex(index, callback);
              onIndexChange && onIndexChange(index);
            }}
            renderScene={renderScene}
            keyboardDismissMode={keyboardDismissMode}
            swipeEnabled={swipeEnabled}
            onSwipeStart={onSwipeStart}
            onSwipeEnd={onSwipeEnd}
            onPagerScroll={onPagerScroll}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ScrollableTabView;
