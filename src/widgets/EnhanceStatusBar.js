import React from "react";

import { View, StatusBar } from "react-native";

import PropTypes from "prop-types";

import BaseWidget from './BaseWidget';

/**
 * <EnhanceStatusBar backgroundColor={'#FB4950'} />
 * 自定义EnhanceStatusBar
 */
export default class EnhanceStatusBar extends BaseWidget {

  static propTypes = {
    backgroundColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //状态栏背景颜色 
  }

  static defalutProps = {
    backgroundColor: '#FFFFFF', //默认白色
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundColor } = this.props;
    return (
      <View style={{ width: Const.SCREEN_WIDTH, height: Const.STATUSBAR_HEIGHT, backgroundColor }}>
        <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" animated={true}
          showHideTransition={'fade'} networkActivityIndicatorVisible={false} translucent={true} />
      </View>
    )
  }
}

