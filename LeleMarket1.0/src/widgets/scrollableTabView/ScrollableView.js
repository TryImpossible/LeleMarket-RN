import React from 'react';

import { Animated, Easing, ViewPagerAndroid, FlatList, ViewPropTypes, View, Text } from 'react-native';

import BaseWidget from '../BaseWidget';

import PropTypes from 'prop-types';

export default class ScrollableTabView extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //樣式
    initialPage: PropTypes.number, //选中的页面
    locked: PropTypes.bool, //是否鎖定，不允許滾動
    onScroll: PropTypes.func, //滚动方法
    onScrollEnd: PropTypes.func, //滚动结束方法，即页面选中
    enableScrollAnimation: PropTypes.bool, //是否开启滚动动画
  }

  static defaultProps = {
    initialPage: 0, //默认 0
    locked: false, //默认false
    enableScrollAnimation: false //默认false，调用滚动时效果不太好
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { style, initialPage, locked, onScroll, onScrollEnd, children = [] } = this.props;
    if (__IOS__ && children.length > 0) {
      return (
        <FlatList
          ref={ref => this.flatList = ref}
          style={{ flexGrow: 1, width: Const.SCREEN_WIDTH, ...style }}
          data={children}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled={true}
          scrollEnabled={!locked}
          onScroll={({ nativeEvent }) => {
            const offsetX = nativeEvent.contentOffset.x; //位移距离
            const percent = offsetX / Const.SCREEN_WIDTH; //移动比例
            onScroll && onScroll(percent);

            //enableScrollAnimation为false时，不会执行 onMomentumScrollEnd 方法
            if (Number.isSafeInteger(percent) && percent >= 0) {
              onScrollEnd && onScrollEnd(percent);
            }
          }}
          onMomentumScrollEnd={({ nativeEvent }) => {
            const offsetX = nativeEvent.contentOffset.x; //位移距离
            const index = Math.round(offsetX / Const.SCREEN_WIDTH); //选中的页面
            onScrollEnd && onScrollEnd(index);
          }}
          keyExtractor={(item, index) => `ScrollableView${index}`}
          renderItem={({ item, index }) => children[index]}
        />
      )
    } else if (__ANDROID__ && children.length > 0) {
      return (
        <ViewPagerAndroid
          ref={ref => this.viewPager = ref}
          style={{ flexGrow: 1, width: Const.SCREEN_WIDTH, ...style }}
          scrollEnabled={!locked}
          keyboardDismissMode="on-drag"
          onPageScroll={({ nativeEvent }) => {
            const { offset, position } = nativeEvent;
            const percent = offset + position;
            onScroll && onScroll(percent);

            // setPage()和setPageWithoutAnimation()不会回调onPageSelected，因此在这里处理
            if (Number.isSafeInteger(percent) && percent >= 0) {
              onScrollEnd && onScrollEnd(percent);
            }
          }}
          onPageSelected={({ nativeEvent }) => {
            const { offset, position } = nativeEvent;
            onScrollEnd && onScrollEnd(position);
          }} >
          {children}
        </ViewPagerAndroid>
      )
    } else {
      return null;
    }
  }

  /**
   * 滚动方法，一般外部调用
   * @param {*} index 页面索引 
   */
  scrollToIndex(index) {
    const { enableScrollAnimation } = this.props;
    if (__IOS__) {
      this.flatList && this.flatList.scrollToOffset({ animated: enableScrollAnimation, offset: index * Const.SCREEN_WIDTH });;
    } else if (__ANDROID__) {
      if (enableScrollAnimation) {
        this.viewPager && this.viewPager.setPage(index);
      } else {
        this.viewPager && this.viewPager.setPageWithoutAnimation(index);
      }
    }
  }

}
