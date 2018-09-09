import React from 'react';

import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

import NavListener,{ Enhancer } from '../../utils/NavListener';

class APage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.BasicStyle.pageContainer}>
        <NavBar leftText={'返回'} leftPress={() => this.pop() } title={'AAPage'} rightIcon={'icon_msg'} rightPress={() => this.push('BPage')} />
      </View>
    )
  }
}

export default Enhancer(APage);