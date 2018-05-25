import React from 'react';

import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

export default class Toast extends BaseWidget {

  static positions = ['top', 'center', 'bottom'];

  static propTypes = {
    visible: PropTypes.bool, //是否显示 
    message: PropTypes.string, //信息     
    duration: PropTypes.number, //显示时长
    position: PropTypes.oneOf(Toast.positions) //Toast位置
  }

  static defaultProps = {
    visible: false,
    message: '我是Toast',
    duration: 2000,
    position: 'center'
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(1);
    this.state = {
      visible: props.visible,
      message: props.message,
      position: props.position
    };
  }

  /**
   * 显示消息
   * @param {*} message 内容
   * @param {*} duration 时长
   * @param {*} position 位置
   */
  show(message, duration = Toast.defaultProps.duration, position = Toast.defaultProps.position) {
    this.timer && clearTimeout(this.timer);
    this.path.setValue(1);
    this.setState({
      visible: true,
      message,
      position
    });
    this.timer = setTimeout(() => {
      Animated.spring(this.path, {
        toValue: 0,
        easing: Easing.ease,
        duration: 200,
      }).start(()=>{
        this.timer && clearTimeout(this.timer);
        this.setState({ visible: false });
      });
    }, duration);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { visible, message, position } = this.state;
    if (visible) {
      let index = Toast.positions.indexOf(position) != -1 ? Toast.positions.indexOf(position) : 1;
      let justifyContent = ['flex-start', 'center', 'flex-end'][index]; 
      return (
        <Animated.View style={[styles.container, { opacity: this.path, justifyContent: justifyContent }]} pointerEvents={'none'}>
          <View style={styles.view}>
            <Text numberOfLines={0} style={styles.text}>{message}</Text>
          </View>
        </Animated.View>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center'
  },
  view: { 
    marginVertical: getSize(50),
    borderRadius: 5,
    backgroundColor: 0x00000080,
    paddingHorizontal: getSize(12),
    paddingVertical: getSize(5)
  },
  text: {
    fontSize: getSize(15),
    color: '#ffffff',
    lineHeight: getSize(20),
    maxWidth: Const.SCREEN_WIDTH / 3 * 2
  }
});