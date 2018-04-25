import React from 'react';

import { View, FlatList, TouchableOpacity, Animated, Easing, Image, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

//测试数据
const BANNER = [
  "https://api.51app.cn/resource/diymall/uu20/special/752ced27.png",
  "https://api.51app.cn/resource/diymall/uu20/special/eaa696ae.png",
  "https://api.51app.cn/resource/diymall/uu20/special/66991c45.png"
];

export default class Banner extends BaseWidget {

  static propTypes = {
    images: PropTypes.array, //图片数组
    height: PropTypes.number, //Banner高度
    defaultIndex: PropTypes.number, //初始化
    onClick: PropTypes.func, //点击
    duration: PropTypes.number, //轮播间隔
    autoPlay: PropTypes.bool, //是否自动播放
    autoLoop: PropTypes.bool, //是否轮播
  }

  static defaultProps = {
    images: [],
    height: getSize(150), //默认高度，150
    defaultIndex: 0, //默认选中第一张
    duration: 2500, //默认时长
    autoPlay: false, //默认关闭自动播放
    autoLoop: false, //默认关闭轮播 
  }

  constructor(props) {
    super(props);
    this.currentIndex = props.defaultIndex;
    this.canResponseClick = true; //默认响应点击事件
  }

  componentDidMount() {
    this.props.autoPlay && this.autoPlay(); //是否播放
  }

  componentWillUnmount() {
    this.stopPlay();
  }

  autoPlay() {
    const { images, duration, autoLoop } = this.props;
    this.interval = setInterval(() => {
      if (autoLoop) { //是否轮播
        let nextIndex = this.currentIndex + 1;
        nextIndex = (nextIndex) % 3;
        this._scrollTo(nextIndex, true);
      } else {
        if (this.currentIndex === images.length - 1) { //不轮播的情况下，播放至最后一张，是否停止播放
          this.stopPlay();
        } else {
          let nextIndex = this.currentIndex + 1;
          nextIndex = (nextIndex) % 3;
          this._scrollTo(nextIndex, true);
        }
      }
    }, duration);
  }

  stopPlay() {
    this.interval && clearInterval(this.interval);
  }

  _scrollTo(index, animated = false) {
    this.bannersFlatList && this.bannersFlatList.scrollToOffset({ animated, offset: index * Const.SCREEN_WIDTH });
  }

  render() {
    let { images, height, defaultIndex, onClick } = this.props;
    return (
      <View style={{ justifyContent: 'flex-end', alignItems: 'center', height: getSize(150) }}>
        <FlatList
          onTouchStart={() => {
            this.canResponseClick = false; //TouchStart时，不响应点击
            this.stopPlay();
          }}
          onTouchEnd={() => {
            this.canResponseClick = true; //TouchEnd时，不响应点击
            this.autoPlay();
          }}
          ref={ref => this.bannersFlatList = ref}
          data={images}
          horizontal={true}
          pagingEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={() => this.canResponseClick && onClick && onClick(index)} >
                <Animated.Image style={{ width: Const.SCREEN_WIDTH, height, }} source={{ uri: item }} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => `Banners${index}`}
          getItemLayout={(data, index) => (
            { length: height, offset: height * index, index }
          )}
          onScrollBeginDrag={({ nativeEvent }) => {

          }}
          onScrollEndDrag={({ nativeEvent }) => {
            const offsetX = nativeEvent.contentOffset.x;
            if (offsetX >= (images.length - 1) * Const.SCREEN_WIDTH) {
              this._scrollTo(0);
            } else if (offsetX <= 0) {
              this._scrollTo(images.length - 1);
            } 
          }}
          onMomentumScrollEnd={({ nativeEvent }) => {

          }}
          onScroll={({ nativeEvent }) => {
            const offsetX = nativeEvent.contentOffset.x;
            let index = (offsetX / Const.SCREEN_WIDTH);
            this.currentIndex = index;
            this.pointView && this.pointView.scrollTo(index);
          }} />
        <BannerIndicater ref={ref => this.pointView = ref} style={{ position: 'absolute', bottom: getSize(5) }}
          count={images.length} index={defaultIndex} />
      </View>
    )
  }
}

/**
 * 指示器
 */
class BannerIndicater extends BaseWidget {
  static propTypes = {
    style: PropTypes.object, //样式
    count: PropTypes.number, //数量
    index: PropTypes.number, //初始值
  }

  static defaultProps = {
    style: {}, //默认样式为空
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(0);
    this.points = Array(props.count).fill('Indicater');
  }

  scrollTo(index) {
    Animated.spring(this.path, {
      toValue: index,
      duration: 50,
      easing: Easing.linear
    }).start();
  }

  getInterpolate(index) {
    let { count } = this.props;
    let inputRange = [];
    let outputRange = [];
    this.points && this.points.map((item, i) => {
      inputRange.push(i);
      outputRange.push(i !== index ? 'grey' : 'white');
    });
    return { inputRange, outputRange };
  }

  render() {
    let { style, count } = this.props;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', ...style }}>
        {
          this.points.map((item, index) => {
            let backgroundColor = this.path.interpolate(this.getInterpolate(index));
            let marginRight = index !== this.points.length - 1 ? getSize(8) : 0;
            return (
              <Animated.View key={`PointView${index}`} style={[ styles.dot, { backgroundColor, marginRight }]} />
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    width: getSize(6),
    height: getSize(6),
    borderRadius: getSize(3),
  }
});