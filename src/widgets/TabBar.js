import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing, ViewPropTypes } from 'react-native';

import BaseWidget from './BaseWidget';

import SvgUri from '../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

/**
 *
  Demo:
    const TABS = [
      { iconUri: 'icon_tab_bar_home', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '首页', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
      { iconUri: 'icon_tab_bar_discover', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '发现', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
      { iconUri: 'icon_tab_bar_customized', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '定制', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
      { iconUri: 'icon_tab_bar_shoppingcar', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '购物车', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
      { iconUri: 'icon_tab_bar_mine', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '我的', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
    ];
    <TabBar tabs={TABS} selectedIndex={0} onTabSelected={ index => { 
            // alert(`点击了${index}`);
          } } />
 * 
 * 底部选项卡
 */
export class TabBar extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //TabBar样式
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        iconUri: PropTypes.string.isRequired,
        normalIconColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        activeIconColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        nameText: PropTypes.string.isRequired,
        normalNameColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        activeNameColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })
    ).isRequired, //主要数据， 图标、文字、颜色等 
    selectedIndex: PropTypes.number, //默认选中的Index
    onTabSelected: PropTypes.func, //选中的方法
  }

  static defaultProps = {
    style: {},
    selectedIndex: 0, //默认选中第1项
  }

  constructor(props) {
    super(props);
    this.initPaths();
    this.state = {
      selectedIndex: props.selectedIndex
    }
  }

  initPaths() {
    const { tabs = [], selectedIndex } = this.props;
    this.paths = tabs.map((element, index) => index === selectedIndex ? new Animated.Value(1) : new Animated.Value(0));
  }

  updateSelected = (index, onTabSelected) => {
    this.paths[this.state.selectedIndex].setValue(0);
    this.setState({ selectedIndex: index }, () => {
      Animated.spring(this.paths[index], {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
      }).start();
      onTabSelected && onTabSelected(index);
    });
  }

  render() {
    const { tabs = [], onTabSelected } = this.props;

    return (
      <View style={[styles.tabBar, { ...this.props.style }]}>
        {
          tabs.map((element, index) => {
            return (
              <TabBarItem 
                key={`TabBarItem${index}`}
                icon={{ uri: element.iconUri, normalColor: element.normalIconColor, activeColor: element.activeIconColor }}
                name={{ text: element.nameText, normalColor: element.normalNameColor, activeColor: element.activeNameColor }}
                active={this.state.selectedIndex === index}
                path={this.paths[index]}
                onPress={() => this.updateSelected(index, onTabSelected) } />
            )
          })
        }
      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.updateSelected(nextProps.selectedIndex);
    }
  }
}

/**
 * 底部选项卡单项
 */
class TabBarItem extends BaseWidget {

  static propTypes = {
    style: ViewPropTypes.style, //TabBarItem 样式
    onPress: PropTypes.func.isRequired, //TabBarItem 点击
    icon: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      normalColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      activeColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }).isRequired, //图标
    name: PropTypes.shape({
      text: PropTypes.string.isRequired,
      normalColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      activeColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }).isRequired, //文字
    active: PropTypes.bool //是否选中
  }

  static defaultProps = {
    active: false, //默认false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { style, onPress, icon, name, active, path } = this.props;
    const scale = path.interpolate(
      {
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.8, 1.1]
      }
    );

    return (
      <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} style={[styles.tabBarItem, { ...style }]} onPress={onPress} >
        <Animated.View style={{ justifyContent: 'center', alignItems: 'center', transform: [{ scale }] }} >
          <SvgUri source={icon && icon.uri} width={getSize(22)} height={getSize(22)} fill={!active ? icon.normalColor : icon.activeColor} />
          <Text style={[styles.tabBarItemText, { color: !active ? name.normalColor : name.activeColor }]}>{name && name.text}</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    width: Const.SCREEN_WIDTH,
    height: getSize(49),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: Const.LINE_WIDTH,
    borderTopColor: Const.LINE_COLOR
  },
  tabBarItem: {
    flex: 1,
    height: getSize(49),
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItemIcon: {
    width: getSize(30),
    height: getSize(36),
  },
  tabBarItemText: {
    marginTop: 3,
    fontSize: getSize(10),
    lineHeight: getSize(10),
    letterSpacing: getSize(1)
  }
});