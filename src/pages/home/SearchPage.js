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

// export const RichEditorView = requireNativeComponent('RichEditorView', { 
//   propTypes: {
//     backgroundColor: PropTypes.number,
//     backgroundUrl: PropTypes.string,
//     editorHeight: PropTypes.number,
//     editorFontSize: PropTypes.number,
//     editorFontColor: PropTypes.number,
//     placeHolder: PropTypes.string,
//     inputEnabled: PropTypes.bool,
//     ...View.propTypes // 包含默认的View的属性
//   } 
// });


// xcrun simctl openurl booted diy://searchPage/food
// adb shell am start -W -a android.intent.action.VIEW -d "diy://diy/searchPage/food" com.bynn.diy

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.BasicStyle.pageContainer}>
        <NavBar leftText={'返回'} title={'搜索'} />
        <Text>需要搜索的参数: {this.getProps().param ? this.getProps().param : '没有传递参数'}</Text>
        {/* <RichEditorView style={{ width: Const.SCREEN_WIDTH, height: Const.PAGE_HEIGHT }}  /> */}
      </View>
    )
  }
}
