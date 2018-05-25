import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  requireNativeComponent,
  propTypes,
  processColor, //字符Color转换为数字 
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.BasicStyle.pageContainer}>
        <NavBar leftText={'返回'} title={'搜索'} />
        <Text>需要搜索的参数: {this.getProps().param}</Text>
      </View>
    )
  }
}
