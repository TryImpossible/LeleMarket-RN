import React from "react";

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import SvgUri from '../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

import BaseWidget from './BaseWidget';

/**
 *  <Button style={{ flex: 1, paddingVertical: getSize(10) }} margin={{ top: getSize(5) }}
 *    icon={{ source: child.icon }} title={child.text} onPress={() => alert(''点击了)} />
 *  自定义按钮，这个封装的有点过了 
 */
export default class EnhanceButton extends BaseWidget {

  static propTypes = {
    style: PropTypes.object, //按钮样式
    icon: PropTypes.shape({
      width: PropTypes.number, //图标宽度
      height: PropTypes.number, //图标高度
      source: PropTypes.string, //图标
      fill: PropTypes.oneOfType([ //颜色
        PropTypes.number,
        PropTypes.string
      ])
    }),
    title: PropTypes.string, //文字
    fontSize: PropTypes.number, //文字大小
    fontWeight: PropTypes.string, //文字粗细
    lineHeight: PropTypes.number, //文字行高
    color: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]), //颜色 
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }), //外边距
    numberofLines: PropTypes.number, //文字换行
    letterSpacing: PropTypes.number, //文字间距

    onPress: PropTypes.func.isRequired //点击方法
  }

  static defaultProps = {
    style: {},
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, //默认0
  }

  constructor(props) {
    super(props);
  }

  /**
   * 图标，可能没有
   */
  renderIcon() {
    if (this.props.icon) {
      const { width = getSize(18), height = getSize(18), ...otherProps } = this.props.icon;
      return <SvgUri width={width} height={height} {...otherProps} />;
    } else {
      return null;
    }
  }

  /**
   * 文字，可能没有
   */
  renderTitle() {
    if (this.props.title) {
      const { title, margin, fontSize = getSize(10), fontWeight, lineHeight, color = '#666666', numberofLines = 1, letterSpacing } = this.props;
      const { top, right, bottom, left } = margin;
      return (
        <View style={{ marginTop: top, marginRight: right, marginBottom: bottom, marginLeft: left }}>
          <Text style={{ fontSize, color,  }} numberofLines={numberofLines} letterSpacing={letterSpacing} >{title}</Text>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    const { style, onPress } = this.props;
    return (
      <TouchableOpacity style={[styles.container, { ...style }]} activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress}>
        {this.renderIcon()}
        {this.renderTitle()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

