'use strict';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Animated,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Easing,
  processColor,
  LayoutRectangle,
} from 'react-native';
import TabItem, { TabItemProps, RouteProps } from './TabItem';
import Indicator from './Indicator';

const styles = StyleSheet.create({
  tabs: {
    minHeight: toDP(Dimens.tabsHeight),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    height: '100%',
    paddingVertical: 8,
  },
});

// function getInterpolate(
//   tabs: Array<{ key: string; title: string }>,
//   index: number,
//   isActive: boolean,
//   category: 'color' | 'scale',
// ) {
//   const inputRange: Array<number | string> = [];
//   const outputRange: Array<number | string> = [];
//   tabs.forEach((item, i) => {
//     inputRange.push(i);
//     if (category === 'color') {
//       outputRange.push(isActive && i === index ? Colors.textDarkColor : Colors.textLightColor);
//     }
//     if (category === 'scale') {
//       outputRange.push(isActive && i === index ? 1.5 : 1);
//     }
//   });
//   return { inputRange, outputRange };
// }

export interface TabBarProps
  extends Omit<TabItemProps, 'style' | 'onTabLayout' | 'onLabelLayout' | 'onPress' | 'route'> {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  renderLabel?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderIcon?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderBadge?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderIndicator?: ({
    indexValue,
    leftValue,
    widthValue,
  }: {
    indexValue: Animated.Value;
    leftValue: Animated.Value;
    widthValue: Animated.Value;
  }) => React.ReactNode;
  renderLeftSection?: () => React.ReactNode;
  renderRightSection?: () => React.ReactNode;
  routes: Array<RouteProps>;
  bounces?: boolean;
  scrollEnabled?: boolean;
  initialIndex?: number;
  onTabPress?: (index: number) => void;
  onTabChange?: (index: number) => void;
  indicatorMode?: 'tab' | 'label';
  indicatorWidthRatio?: number;
  tabMode?: 'scrollable' | 'fixed';
}

const Tabs: React.FC<TabBarProps> = ({
  style,
  contentContainerStyle,
  tabStyle,
  labelStyle,
  indicatorStyle,
  activeColor,
  inactiveColor,
  renderLabel,
  renderIcon,
  renderBadge,
  renderIndicator,
  renderLeftSection,
  renderRightSection,
  routes,
  bounces,
  scrollEnabled,
  onTabPress,
  onTabChange,
  tabMode,
  initialIndex,
  indicatorMode,
  indicatorWidthRatio = 1,
}) => {
  const indexValue = useRef(new Animated.Value(0)).current;
  const indicatorWidthValue = useRef(new Animated.Value(0)).current;
  const indicatorLeftValue = useRef(new Animated.Value(0)).current;
  const labelColorValue = useRef(new Animated.Value(processColor(Colors.textLightColor) as number)).current;
  const labelScaleValue = useRef(new Animated.Value(1.2)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollViewWidthRef = useRef(0);
  const scrollViewHeightRef = useRef(0);
  const tabItemLayoutRef = useRef<{ [key: number]: LayoutRectangle }>({});
  const tabLabelLayoutRef = useRef<{ [key: number]: LayoutRectangle }>({});
  const timerRef = useRef<NodeJS.Timeout>();
  const selectedIndexRef = useRef(0);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const scrollToIndex = useCallback(
    (index: number, isAnimated?: undefined | boolean, callback?: () => void) => {
      if (index === selectedIndexRef.current && index !== initialIndex) {
        return;
      }
      if (!tabItemLayoutRef.current[index] || !tabLabelLayoutRef.current[index]) {
        return;
      }

      let animated = Math.abs(index - selectedIndexRef.current) === 1;
      if (typeof isAnimated === 'boolean') {
        animated = isAnimated;
      }
      const animations: Array<Animated.CompositeAnimation> = [];
      const { x, width } = tabItemLayoutRef.current[index];
      const { width: labelWidth } = tabLabelLayoutRef.current[index];

      let ratio = indicatorWidthRatio % 1;
      ratio = ratio === 0 && indicatorWidthRatio >= 1 ? 1 : ratio;

      let leftValue = x + (width - width * ratio) / 2;
      let widthValue = width * ratio;

      if (indicatorMode === 'label') {
        leftValue = x + (width - labelWidth * ratio) / 2;
        widthValue = labelWidth * ratio;
      }

      if (animated) {
        // animations.push(
        //   Animated.spring(this.indexValue, { toValue: index, friction: 12, tension: 40, useNativeDriver: false }),
        // );
        // animations.push(
        //   Animated.spring(this.indicatorLeftValue, {
        //     toValue: leftValue,
        //     friction: 12,
        //     tension: 40,
        //     useNativeDriver: false,
        //   }),
        // );
        // animations.push(
        //   Animated.spring(this.indicatorWidthValue, {
        //     toValue: widthValue,
        //     friction: 12,
        //     tension: 40,
        //     useNativeDriver: false,
        //   }),
        // );
        animations.push(
          Animated.timing(indexValue, {
            toValue: index,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        );
        animations.push(
          Animated.timing(indicatorLeftValue, {
            toValue: leftValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        );
        animations.push(
          Animated.timing(indicatorWidthValue, {
            toValue: widthValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        );
      } else {
        animations.push(Animated.timing(indexValue, { toValue: index, duration: 0, useNativeDriver: false }));
        animations.push(
          Animated.timing(indicatorLeftValue, { toValue: leftValue, duration: 0, useNativeDriver: false }),
        );
        animations.push(
          Animated.timing(indicatorWidthValue, { toValue: widthValue, duration: 0, useNativeDriver: false }),
        );
      }

      const lastTabItemLayout = tabItemLayoutRef.current[routes.length - 1];
      if (scrollViewRef.current && lastTabItemLayout) {
        const pageCenterX = (scrollViewWidthRef.current - width) / 2;
        const firstX = 0 + pageCenterX;
        const lastX = lastTabItemLayout.x - pageCenterX;
        // console.warn(x, pageCenterX, firstX, lastX);

        if (x < firstX) {
          scrollViewRef.current && scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        } else if (x > lastX) {
          scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
          const dx = x - pageCenterX;
          scrollViewRef.current && scrollViewRef.current.scrollTo({ x: dx, y: 0, animated: true });
        }
      }

      selectedIndexRef.current = index;
      setSelectedIndex(index);
      Animated.parallel(animations).start(callback);
    },
    [
      indexValue,
      indicatorLeftValue,
      indicatorMode,
      indicatorWidthRatio,
      indicatorWidthValue,
      initialIndex,
      routes.length,
    ],
  );

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const scrollToInitialIndex = () => {
    timerRef.current = setTimeout(() => {
      if (scrollViewWidthRef.current && scrollViewHeightRef.current) {
        scrollToIndex(initialIndex || 0, true);
      }
    }, 200);
  };

  return (
    <View style={[styles.tabs, style]}>
      {renderLeftSection && renderLeftSection()}
      <ScrollView
        style={{ flex: 1, height: '100%' }}
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
          tabMode === 'fixed' ? { width: '100%' } : {},
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        bounces={bounces}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => {
          scrollViewWidthRef.current = width;
          scrollViewHeightRef.current = height;
          scrollToInitialIndex();
        }}
      >
        {routes.map((route: RouteProps, index: number) => {
          const isActive = index === selectedIndex;
          return (
            <TabItem
              route={route}
              style={[tabStyle, tabMode === 'fixed' ? { flex: 1 } : {}]}
              key={`TabItem${String(index)}`}
              onTabLayout={({ nativeEvent: { layout } }) => {
                // console.warn(`tabItem${index}Layout`, layout);
                tabItemLayoutRef.current[index] = layout;
              }}
              onLabelLayout={({ nativeEvent: { layout } }) => {
                // console.warn(`tabItem${index}Layout`, layout);
                tabLabelLayoutRef.current[index] = layout;
              }}
              isActive={isActive}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() => {
                onTabPress && onTabPress(index);
                scrollToIndex(index, undefined, () => {
                  onTabChange && onTabChange(index);
                });
              }}
              labelStyle={labelStyle}
              colorValue={labelColorValue}
              scaleValue={labelScaleValue}
              renderLabel={renderLabel}
              renderIcon={renderIcon}
              renderBadge={renderBadge}
            />
          );
        })}
        {renderIndicator ? (
          renderIndicator({
            indexValue: indexValue,
            leftValue: indicatorLeftValue,
            widthValue: indicatorWidthValue,
          })
        ) : (
          <Indicator style={indicatorStyle} leftValue={indicatorLeftValue} widthValue={indicatorWidthValue} />
        )}
      </ScrollView>
      {renderRightSection && renderRightSection()}
    </View>
  );
};

Tabs.defaultProps = {
  initialIndex: 0,
  bounces: true,
  scrollEnabled: true,
  indicatorMode: 'tab',
  tabMode: 'fixed',
};

export default Tabs;
