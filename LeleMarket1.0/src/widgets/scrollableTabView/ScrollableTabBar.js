import React from 'react';

import { View, Text, Animated, Easing, StyleSheet, ScrollView, TouchableOpacity, ViewPropTypes, ColorPropType, InteractionManager } from 'react-native';

import BaseWidget from '../BaseWidget';

import PropTypes from 'prop-types';

const animationDuration = 150; //动画时长

export default class ScrollableTabBar extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //样式
    tabs: PropTypes.array.isRequired, //Tab数组
    initialIndex: PropTypes.number, //选中的Tab
    onTabChange: PropTypes.func, //Tab切换方法
    tabBarBackgroundColor: ColorPropType, //Tab背景颜色 
    tabBarSpace: PropTypes.number, //每个tab的间距
    tabBarActiveTextColor: ColorPropType, //Tab Text选中的颜色 
    tabBarInactiveTextColor: ColorPropType, //Tab Text非选中的颜色 
    tabBarTextStyle: PropTypes.object, // Tab Text的样式
    tabBarUnderlineStyle: ViewPropTypes.style, // Tab 下划线的样式
    enableScrollAnimation: PropTypes.bool, //是否开启滚动动画
  }

  static defaultProps = {
    tabs: ['劉備', '诸葛亮', '关羽', '张飞', '马超', '黄忠', '赵云', '司马懿'],
    initialTab: 0,
    tabBarSpace: getSize(12), 
    tabBarBackgroundColor: 'green',
    tabBarActiveTextColor: 'red',
    tabBarInactiveTextColor: 'black',
    enableScrollAnimation: true,
  }

  constructor(props) {
    super(props);

    this.textColorPath = new Animated.Value(0); //Tab 文字颜色
    this.textTranslateXPath = new Animated.Value(0); //Tab 下划线位移
    this.textWidthPath = new Animated.Value(0); //Tab 下划线宽度

    this.itemTabWidth = {}; //每个Tab的宽度
  }

  render() {
    const { 
      style,
      tabs,
      tabBarBackgroundColor,
      tabBarSpace,
      tabBarActiveTextColor,
      tabBarTextStyle,
      onTabChange,
      tabBarUnderlineStyle
    } = this.props;
    return (
      <ScrollView
        ref={ref => this.scrollableTabBar = ref}
        style={{ maxWidth: Const.SCREEN_WIDTH, height: getSize(44), ...style, flexGrow: 0, backgroundColor: tabBarBackgroundColor, }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false} >
        {
          tabs.map((item, index) => {
            let color = this.textColorPath.interpolate(this._getInterpolate(index));
            let scale = this.textColorPath.interpolate(this._getInterpolate(index, 'scale'));
            return (
              <TouchableOpacity
                key={`ScrollableTabBar${index}`}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                activeOpacity={Const.ACTIVE_OPACITY}
                onPress={() => {
                  this.changeTabTo(index);
                  InteractionManager.runAfterInteractions(() => {
                    this.props.onTabChange && this.props.onTabChange(index);
                  })
                }} >
                <Animated.Text
                  onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                    this.itemTabWidth[index] = __IOS__ ? getSize(width) : width;
                    if (index == 0) this.changeTabTo(0, 'spring');
                  }}
                  style={{ ...tabBarTextStyle, color, transform: [{ scale }], marginHorizontal: tabBarSpace  }}>
                  {item}
                </Animated.Text>
              </TouchableOpacity>
            )
          })
        }
        <Animated.View style={{ height: getSize(3), ...tabBarUnderlineStyle, position: 'absolute', bottom: 0, left: this.textTranslateXPath, width: this.textWidthPath, backgroundColor: tabBarActiveTextColor }} />
      </ScrollView>
    )
  }

  /**
   * Tab 插值映射
   * @param {*} index 
   */
  _getInterpolate(index, mode = 'color') {
    const { tabBarActiveTextColor, tabBarInactiveTextColor } = this.props;
    let inputRange = [];
    let outputRange = [];
    this.props && this.props.tabs.map((item, i) => {
      inputRange.push(i);
      if (mode === 'color') {
        outputRange.push(i !== index ? tabBarInactiveTextColor : tabBarActiveTextColor);
      } else if ('scale'){
        outputRange.push(i !== index ? 1 : 1.1);
      } else {
        outputRange.push(i);
      }
    });
    return { inputRange, outputRange };
  }

  /**
   * 下划线需要滚动的距离
   * @param {*} index 
   */
  _countScrollDistance(index) {
    const { tabBarSpace } = this.props;
    let x = 0;
    while (index > 0) {
      let width = this.itemTabWidth[index - 1];
      x += (width + tabBarSpace * 2);
      index--;
    }
    return x;
  }

  /**
   * 计算点击Tab的位置，判断是否滚动
   * @param {*} index 
   */
  scrollTabBar(index) {
    if (index !== 0) {
      const { tabBarSpace } = this.props;
      let currentX = tabBarSpace + this._countScrollDistance(Math.round(index));
      let nextX = tabBarSpace + this._countScrollDistance(Math.round(index) + 1);
      let totalX = tabBarSpace + this._countScrollDistance(this.props.tabs.length - 1);
      if (currentX >= 0 && nextX <= Const.SCREEN_WIDTH) {
        this.scrollableTabBar && this.scrollableTabBar.scrollTo({ x: 0, y: 0, animated: true });
      } else if ((totalX - currentX) <= Const.SCREEN_WIDTH) {
        this.scrollableTabBar && this.scrollableTabBar.scrollToEnd({ animated: true });
      } else {
        this.scrollableTabBar && this.scrollableTabBar.scrollTo({ x: currentX - tabBarSpace, y: 0, animated: true });
      }
    }
  }

  /**
   * 切换Tab，外部方法
   * @param {*} index 
   * @param {*} animatedType 
   */
  changeTabTo(index, animatedType = 'timing') {
    const { tabBarSpace, enableScrollAnimation, tabBarUnderlineStyle } = this.props;

    if (!enableScrollAnimation && !Number.isSafeInteger(index)) return; //关闭滚动动画，index为整数

    let animations = [];
    if (tabBarUnderlineStyle && tabBarUnderlineStyle.height === 0) { //tabBarUnderlineStyle的height为0时，不执行下划线的动画
      animations = [
        Animated[animatedType](this.textColorPath, {
          toValue: index,
          easing: Easing.linear,
          duration: animationDuration
        })
      ];
    } else {
      let distance = this._countScrollDistance(Math.ceil(index)); //滚动距离
      let path = tabBarSpace + distance / (Math.ceil(index) || 1) * index; 

      animations = [
        Animated[animatedType](this.textColorPath, {
          toValue: index,
          easing: Easing.linear,
          duration: animationDuration
        }),
        Animated[animatedType](this.textWidthPath, {
          toValue: this.itemTabWidth[Math.ceil(index)],
          easing: Easing.linear,
          duration: animationDuration
        }),
        Animated[animatedType](this.textTranslateXPath, {
          toValue: path,
          easing: Easing.linear,
          duration: animationDuration
        })
      ];
    }
    Animated.parallel(animations).start();

    this.scrollTabBar(index);
  }

}