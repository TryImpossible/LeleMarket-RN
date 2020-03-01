
import React from 'react';

import { TouchableOpacity, View, Text, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import SvgUri from '../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

export default class ErrorComponent extends BaseWidget {

  static data = {
    'NETWORK': { icon: 'icon_err_network', describe: '请点击屏幕，重新加载' },
    'TIMEOUT': { icon: 'icon_err_timeout', describe: '请点击屏幕，重新加载' },
    'PROGRAM': { icon: 'icon_err_program', describe: '请点击屏幕，重新加载' },
    'SERVER': { icon: 'icon_err_server', describe: '请点击屏幕，重新加载' }
  }

  static propTypes = {
    visible: PropTypes.bool, //是否显示 
    style: PropTypes.object, //样式
    mode: PropTypes.oneOf(['NETWORK', 'TIMEOUT', 'PROGRAM', 'SERVER']),
    retry: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {}, //默认样式空
    visible: false, //默认隐藏 
    mode: 'PROGRAM',
    retry: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      mode: props.mode
    }
  }

  render() {
    if (this.state.visible) {
      const { style, retry } = this.props;
      const { mode } = this.state;
      return (
        <TouchableOpacity style={[styles.container, { backgroundColor: '#fff', ...style }]} activeOpacity={1} onPress={retry} >
          <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SvgUri width={getSize(90)} height={getSize(90)} source={ErrorComponent.data[mode].icon} fill={'#8cadca'} />
            <Text style={{ marginTop: getSize(10), color: '#666666', fontSize: getSize(13) }}>{ErrorComponent.data[mode].describe}</Text>
          </Animated.View>
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  }

  /**
   * 显示
   */
  show(mode = ErrorComponent.defaultProps.mode) {
    this.setState({
      visible: true,
      mode
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
    alignItems: 'center',
  }
});