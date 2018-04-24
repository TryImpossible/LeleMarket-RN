
import React from 'react';

import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import SvgUri from '../dependencies/react-native-svg-uri'

import PropTypes from 'prop-types';

export default class EmptyComponent extends BaseWidget {
  static propTypes = {
    style: PropTypes.object, //样式
    visible: PropTypes.bool, //是否显示 
    icon: PropTypes.element, //Svg图标|Image标签
    text: PropTypes.element, //Text标签
    describe: PropTypes.string //描述
  }

  static defaultProps = {
    style: {}, //默认样式空
    visible: false, //默认隐藏
    icon: <SvgUri width={getSize(90)} height={getSize(90)} source={'icon_data_empty'} fill={'#8cadca'} />,
    describe: '暂无信息' //默认描述信息
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: EmptyComponent.defaultProps.visible
    }
  }

  render() {
    if (this.state.visible) {
      const { style, icon, text, describe } = this.props;
      return (
        <View style={[styles.container, { backgroundColor: '#fff', ...style }]}>
          {icon}
          <View style={styles.wraptext}>
            {text || <Text style={styles.text}>{`暂无信息`}</Text>}
          </View>
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
    backgroundColor: Const.MAIN_COLOR,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wraptext: {
    marginTop: getSize(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#666666',
    fontSize: getSize(13)
  }
});