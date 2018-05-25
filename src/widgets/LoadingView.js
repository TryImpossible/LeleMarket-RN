import React from 'react';

import { View, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

import Spinner from "react-native-spinkit";

export default class LoadingView extends BaseWidget {

  static propTypes = {
    style: PropTypes.object, //样式
    visible: PropTypes.bool, //是否显示 
    type: PropTypes.oneOf(['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt']), //指示器类型
    size: PropTypes.number, //指示器尺寸
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //指示器前景色 
  }

  static defaultProps = {
    style: {}, //默认，空样式
    visible: false, //默认，隐藏 
    backgroundColor: '#ffffff', //默认，白色
    type: 'ChasingDots',
    size: getSize(100), //默认，100
    color: 'grey', //默认，白色
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    }
  }

  render() {
    let { style, type, size, color } = this.props;
    if (this.state.visible) {
      return (
        <View style={[styles.container, { backgroundColor: '#fff', ...style }]}>
          <Spinner style={{}} isVisible={true} size={size} type={type} color={color} />
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


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
});