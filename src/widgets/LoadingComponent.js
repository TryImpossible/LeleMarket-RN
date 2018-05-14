

import React from 'react';

import { View, ActivityIndicator, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

export default class LoadingComponent extends BaseWidget {

  static propTypes = {
    style: PropTypes.object, //样式
    visible: PropTypes.bool, //是否显示 
    backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //背景颜色 
    loadingColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //指示器前景色 
    size: PropTypes.oneOf(['small', 'large']), //指示器尺寸
    mask: PropTypes.bool, //是否显示遮罩
    maskColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //遮罩层景色 
  }

  static defaultProps = {
    style: {}, //默认样式为空
    visible: false, //默认，隐藏 
    mask: false, //默认，隐藏
    backgroundColor: Const.MAIN_COLOR, //默认颜色 
    loadingColor: 'grey', //默认，灰色 
    size: 'small', //默认，小
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    }
  }

  render() {
    if (this.state.visible) {
      let { style, mask, maskColor, backgroundColor, loadingColor, size } = this.props;
      return (
        <View style={[styles.container, { backgroundColor, ...style }]}>
          <MaskView mask={mask} maskColor={MaskView} loadingColor={loadingColor} size={size} />
        </View>
      )
    } else {
      return null;
    }
  }


  /**
   * 显示
   */
  show() {
    this.setState({
      visible: true
    });
  }

  /**
   * 隐藏
   */
  dismiss() {
    this.setState({
      visible: false
    });
  }
}

const MaskView = (props) => {
  let { mask, maskColor, loadingColor, size } = props;
  if (mask) {
    return (
      <View style={{ backgroundColor: 'grey', borderRadius: getSize(5), padding: getSize(20) }}>
        <ActivityIndicator
          animating={true}
          color={loadingColor}
          size={size} />
      </View>
    )
  } else {
    return (
      <ActivityIndicator
        animating={true}
        color={loadingColor}
        size={size} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0, 
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});