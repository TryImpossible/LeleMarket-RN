import React from 'react';

import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

/**
 *  紅點提示
 * 
 *  <BadgeView ref={ref => this.badgeView = ref}>
          <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
        </BadgeView>
 */
export default class BadgeView extends BaseWidget {

  static propTypes = {
    position: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number
    }), //位置
    size: PropTypes.number, //Badge尺寸
    backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //Badge背景
  }

  static defaultProps = {
    size: getSize(8),
    backgroundColor: 'red', 
    position: { top: 0, right: 0 }
  }

  constructor(props) {
    super(props);
    this.path = new Animated.Value(0);
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <View>
        {children}
        <Dot {...otherProps} animate={this.path} />
      </View>
    );
  }

  /**
   * 顯示 
   */
  show() {
    Animated.spring(this.path, {
      toValue: 1,
      velocity: 500,
      tension: 500,
      friction: 12
    }).start();
  }

  /**
   * 消失
   */
  dismiss() {
    Animated.timing(this.path, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease
    }).start();
  }
}

/**
 * 組件，小圓點
 * @param {*} props 
 */
const Dot = (props) => {
  const { size, backgroundColor, position, animate } = props;
  return <Animated.View style={{ opacity: animate, position: 'absolute', top: position.top, right: position.right,
    width: size, height: size, borderRadius: parseInt(size / 2), backgroundColor }} />
}

const styles = StyleSheet.create({
  container: {
  
  },
});