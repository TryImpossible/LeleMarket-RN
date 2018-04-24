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

export const RichEditorView = requireNativeComponent('RichEditorView', { 
  propTypes: {
    backgroundColor: PropTypes.number,
    backgroundUrl: PropTypes.string,
    editorHeight: PropTypes.number,
    editorFontSize: PropTypes.number,
    editorFontColor: PropTypes.number,
    placeHolder: PropTypes.string,
    inputEnabled: PropTypes.bool,
    ...View.propTypes // 包含默认的View的属性
  } 
});

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.BasicStyle.pageContainer}>
        <NavBar leftText={'返回'} leftPress={() => this.pop() } title={'RichEditor'} />
        <RichEditorView style={{ width: Const.SCREEN_WIDTH, height: Const.PAGE_HEIGHT }}  />
      </View>
    )
  }
}
