import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import BaseWidget from './BaseWidget';

import SvgUri from '../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

import EnhanceStatusBar from './EnhanceStatusBar';

import { withNavigation } from 'react-navigation';

/**
 *  
 * <NavBar leftIcon={'icon_scan'} title={'导航栏'} rightIcon={'icon_msg'} />
    <NavBar leftIcon={'icon_scan'} title={'导航栏'} rightText={'编辑'} />
    <NavBar leftText={'返回'} title={'导航栏'} rightIcon={'icon_msg'} /> 
    <NavBar leftText={'返回'} title={'导航栏'} rightText={'编辑'} /> 
    <NavBar leftIcon={'icon_scan'} titleView={<TitleView />} rightIcon={'icon_msg'} showBottomLine={false} />
 * 导航栏
 */
class NavBar extends BaseWidget {

  static propTypes = {
    leftText: PropTypes.string, //左边文字
    leftIcon: PropTypes.string, //左边图标
    leftPress: PropTypes.func, //点击文字或图标
    leftView: PropTypes.element, //左边视图，优先渲染

    title: PropTypes.string, //标题
    titleView: PropTypes.element, //标题视图，优先渲染

    rightText: PropTypes.string, //右边文字
    rightIcon: PropTypes.string, //右边图标
    rightPress: PropTypes.func, //点击文字或图标
    rightView: PropTypes.element, //右边视图，优先渲染

    showBottomLine: PropTypes.bool, //是否显示底部线条

    backgroundColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //导航栏背景颜色 
  }

  static defaultProps = {
    showBottomLine: true,
    backgroundColor: '#FFFFFF',
    leftIcon: 'icon_nav_bar_back'
  }

  constructor(props) {
    super(props);
  }

  /**
   * 状态栏
   */
  renderStatusBar() {
    const { backgroundColor } = this.props;
    return <EnhanceStatusBar backgroundColor={backgroundColor} />
  }

  /**
   * 导航栏,左方视图
   */
  renderLeft() {
    const { leftText, leftIcon, leftPress = () => this.props.navigation.pop(), leftView } = this.props;
    if (leftView) {
      const validLeftView = React.Children.map(leftView, child => {
        if (React.isValidElement(child)) {
          return child;
        } 
      });
      return (
        <View style={[styles.navBarLeftView, { paddingHorizontal: getSize(10) }]}>
          {validLeftView}
        </View>
      )
    } else {
      return ( 
        <View style={styles.navBarLeftView}>
          <TouchableOpacity style={{ paddingHorizontal: getSize(10), minWidth: getSize(44) }} activeOpacity={Const.ACTIVE_OPACITY} onPress={leftPress }>
            {leftText ? <Text style={styles.navBarLeftText}>{leftText}</Text> : ( leftIcon ? <SvgUri width={getSize(24)} height={getSize(24)} source={leftIcon} /> : null )}
          </TouchableOpacity>
        </View>
      )
    }
  }

  /**
   * 导航栏,中间视图
   */
  renderTitle() {
    const { title, titleView } = this.props;
    if (titleView) {
      const validTitleView = React.Children.map(titleView, child => {
        if (React.isValidElement(child)) {
          return child;
        } 
      });
  
      // 克隆组件 
      // React.cloneElement(
      //   element,
      //   [props],
      //   [...children]
      // )
      return (
        <View style={styles.navBarTitleView}>
          {validTitleView}
        </View>
      );
    } else {
      return (
        <View style={styles.navBarTitleView}>
          <Text style={styles.navBarTitleText}>{title}</Text>
        </View>
      )
    }
  }

  /**
   * 导航栏,右方视图
   */
  renderRight() {
    const { rightText, rightIcon, rightPress, rightView } = this.props;
    if (rightView) {
      const validRightView = React.Children.map(rightView, child => {
        if (React.isValidElement(child)) {
          return child;
        } 
      });
      return (
        <View style={[styles.navBarRightView, { paddingHorizontal: getSize(10) }]}>
          {validRightView}
        </View>
      )
    } else {
      return ( 
        <View style={styles.navBarRightView}>
          <TouchableOpacity style={{ paddingHorizontal: getSize(10), minWidth: getSize(44) }} activeOpacity={Const.ACTIVE_OPACITY} onPress={rightPress}>
            {rightText ? <Text style={styles.navBarRightText}>{rightText}</Text> : ( rightIcon ? <SvgUri width={getSize(24)} height={getSize(24)} source={rightIcon} /> : null )}
          </TouchableOpacity>
        </View>
      )
    }
  }

  /**
   * 导航栏
   */
  renderNavgationBar() {
    return (
      <View style={styles.navBar}>
        {this.renderLeft()}
        {this.renderTitle()}
        {this.renderRight()}
      </View>
    )
  }

  render() {
    const { backgroundColor, showBottomLine } = this.props;
    const bottomLine = showBottomLine ? { borderBottomWidth: 1, borderBottomColor: Const.LINE_COLOR } : {}; //底部线条样式
    return (
      <View style={[styles.container, { backgroundColor }, bottomLine  ]}>
        {this.renderStatusBar()}
        {this.renderNavgationBar()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: Const.SCREEN_WIDTH,
    height: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT,
    flexDirection: 'column'
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navBarLeftText: {
    color: '#666666',
    fontSize: getSize(16),
  },
  navBarLeftIcon: {

  },
  navBarTitleView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBarTitleText: {
    color: '#333333',
    fontSize: getSize(18),
  },
  navBarRightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navBarRightText: {
    color: '#666666',
    fontSize: getSize(16),
  },
  navBarRightIcon: {

  },

});

export default withNavigation(NavBar);