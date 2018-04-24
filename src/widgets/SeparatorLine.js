
import React from "react";

import { View } from "react-native";

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

/**
 * <SeparatorLine marginLeft={10} />
 * 线条
 */
export default class SeparatorLine extends BaseWidget {
  
  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //线条颜色 
    width: PropTypes.number, //宽度
    height: PropTypes.number, //高度
    top: PropTypes.number, //距离上
    right: PropTypes.number, //距离右
    bottom: PropTypes.number, //距离下
    left: PropTypes.number, //距离左
  }

  static defaultProps = {
    color: Const.LINE_COLOR,
    width: Const.SCREEN_WIDTH,
    height: Const.LINE_WIDTH,
    top: 0,
    right: 0,
    bottom: 0,
    left:0,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { color, width, height, top, right, bottom, left  } = this.props;
    return (
      <View style={{ backgroundColor: color, width, height, marginTop: top,
        marginRight: right, marginBottom: bottom, marginLeft: left }} />
    )
  }
}