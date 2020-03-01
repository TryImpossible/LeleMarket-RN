import React from 'react';

import { View, FlatList, ScrollView, TouchableOpacity, Animated, Easing, Image, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

import EnhanceImage from './EnhanceImage'

//测试数据
const BANNER = [
  "https://api.51app.cn/resource/diymall/uu20/special/752ced27.png",
  "https://api.51app.cn/resource/diymall/uu20/special/eaa696ae.png",
  "https://api.51app.cn/resource/diymall/uu20/special/66991c45.png",
];

const COLOR = ['red', 'green', 'blue'];

const WIDTH = Const.SCREEN_WIDTH - getSize(60);

export default class CardView extends BaseWidget {

  static propTypes = {
    style: PropTypes.object, //样式
    images: PropTypes.array, //图片
    width: PropTypes.number, //图片宽度
    height: PropTypes.number, //图片高度
    borderRadius: PropTypes.number, //图片圆角 
    margin: PropTypes.shape({
      top: PropTypes.number, //图片上位置
      right: PropTypes.number, //图片右位置
      bottom: PropTypes.number, //图片下位置
      left: PropTypes.number, //图片左位置
    }), 
    resizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'center']), //图片加载模式
    onClick: PropTypes.func, //点击事件
  }

  static defaultProps = {
    style: {}, //默认样式为空
    images: BANNER, //默认数据 
    width: getSize(315), //默认宽度
    height: getSize(150), //默认高度
    margin: { 
      top: 0,
      right: getSize(15),
      bottom: 0, 
      left: getSize(15)
    },
    resizeMode: 'cover', //默认加载样式
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(0);
  }

  /**
   * 获取插值器
   */
  _getInterpolate = (index) => {
    let inputRange = [], outputRange = [];
    (this.props.images || []).map((item, i) => {
      inputRange.push(i);
      if (i === index) {
        outputRange.push(1);
      } else {
        outputRange.push(0.85);
      }
    });
    return { inputRange, outputRange };
  }

  render() {
    const { style, images, width, height, borderRadius, margin, resizeMode, onClick } = this.props;
    return (
      <FlatList
        ref={ref => this.handPickFlatList = ref}
        style={{ ...style }}
        data={images}
        horizontal={true}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Animated.View style={{ width: width, height: height, marginTop: margin.top, marginBottom: margin.bottom,
              marginLeft: margin.left, marginRight: index === images.length - 1 ? margin.right : 0, 
              transform: [{ scaleY: this.path.interpolate(this._getInterpolate(index)) }] }}>
              <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => onClick && onClick(index)} >
                <EnhanceImage style={{ width: width, height: height, borderRadius }} source={{ uri: item }} resizeMode={resizeMode} />
              </TouchableOpacity>
            </Animated.View>
          )
        }}
        keyExtractor={(item, index) => `cardView${index}`}
        onScrollEndDrag={({ nativeEvent }) => {
          // // 效果不太好，暂时不开启
          // const offsetX = nativeEvent.contentOffset.x;
          // if (offsetX >= (images.length - 1) * (Const.SCREEN_WIDTH - getSize(60))) {
          //   this.handPickFlatList && this.handPickFlatList.scrollToOffset({ animated: false, offset: 0 });
          // } 
        }}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x;
          const ratio = offsetX / width;
          this.path.setValue(ratio);
        }} />
    )
  }
}

const styles = StyleSheet.create({

});