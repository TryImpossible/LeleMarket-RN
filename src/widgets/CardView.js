import React from 'react';

import { View, FlatList, ScrollView, TouchableOpacity, Animated, Easing, Image, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

//测试数据
const BANNER = [
  "https://api.51app.cn/resource/diymall/uu20/special/752ced27.png",
  "https://api.51app.cn/resource/diymall/uu20/special/eaa696ae.png",
  "https://api.51app.cn/resource/diymall/uu20/special/66991c45.png"
];

const COLOR = ['red', 'green', 'blue'];

const WIDTH = Const.SCREEN_WIDTH - getSize(60);

export default class CardView extends BaseWidget {

  static propTypes = {
    images: PropTypes.array, //图片
    height: PropTypes.number, //高度
  }

  static defaultProps = {
    images: BANNER,
    height: getSize(150)
  }

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  _onLayout = ({ nativeEvent: { layout: { x, y, width, height } } }) => {

  }

  _scrollTo = () => {

  }

  render() {
    const { images, height } = this.props;
    return (
      <ScrollView
        style={{ marginTop: getSize(30) }}
        onTouchStart={() => { }}
        onTouchEnd={() => { }}
        ref={ref => this.cardView = ref}
        data={images}
        horizontal={true}
        pagingEnabled={false}
        bounces={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0.6}
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

          if (offsetX % WIDTH > WIDTH / 2) {
            // this.cardView && this.cardView.scrollTo({ x: WIDTH + getSize(20),  y: 0, animated: false });
          }
        }}
        onContentSizeChange={(e) => {
        }} >
        {
          images.map((item, index) => {
            return (
              <TouchableOpacity key={`cardView${index}`} style={{ width: WIDTH, height, backgroundColor: COLOR[index], borderRadius: getSize(30), marginLeft: index === 0 ? getSize(10) : 0, marginRight: getSize(10) }} activeOpacity={1} onLayout={this._onLayout} >
                <Animated.Image style={{ width: WIDTH, height, }} source={{ uri: item }} />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

});