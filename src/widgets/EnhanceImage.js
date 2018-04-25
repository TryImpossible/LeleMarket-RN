import React from 'react';

import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

export default class EnhanceImage extends BaseWidget {

  static propTypes = {
    placeholder: PropTypes.number, //占位图，资源ID
  }

  static defaultProps = {
    placeholder: require('../resource/DIY.png'), //默认，DIY.png
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(1);
  }

  render() {
    const { placeholder, onLoad, ...otherProps } = this.props;
    let { width = 0, height = 0, borderRadius = 0 } = this.props.style || {}; //图片尺寸
    let resizeMode = this.props.resizeMode || FastImage.resizeMode.cover; //图片加载模式

    let a = this.path.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    return (
      <View>
         <Animated.View style={{ position: 'absolute', opacity: this.path }}>
          <FastImage style={{ width: width, height: height, borderRadius: borderRadius }}
            resizeMode={'stretch'} source={placeholder} />
        </Animated.View>
        <FastImage
          {...otherProps}
          onProgress={(e)=>{
            console.warn('onProgress');
          }}
          onLoadEnd={() => {
            // console.warn('onLoadEnd');
          }}
          onLoad={event => {
            Animated.timing(this.path, {
              toValue: 0,
              // easing: Easing.bezier(0.15, 0.73, 0.37, 1.2),
              easing: Easing.ease,
              duration: 100
            }).start();
            onLoad && onLoad(event);
          }} />
       
      </View>
    )
  }

}

const styles = StyleSheet.create({

});