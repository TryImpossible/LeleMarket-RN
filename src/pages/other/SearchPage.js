import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  requireNativeComponent,
  propTypes,
  processColor, //字符Color转换为数字 
  Animated,
  Easing
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import SeparatorLine from '../../widgets/SeparatorLine';

import hotSearch from './hotSearch.json';

import WithCloseHOC from '../../widgets/HOC/WithCloseHOC';

const WidthCloseTextInput = WithCloseHOC(TextInput);

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      data: [
        { key: `section1`, text: '巧克力' },
        { key: `section1`, text: '衣服' },
        { key: `section1`, text: '服装' },
        { key: `section1`, text: 'cosplay' },
        { key: `section1`, text: '天涯明月刀' },
        { key: `section1`, text: '天涯明月刀 cosplay' }
      ]
    }
  }

  /**
   * 测试外部链接跳转至App
   */
  // render() {
  //   return (
  //     <View style={this.BasicStyle.pageContainer}>
  //       <NavBar leftText={'返回'} title={'外部链接跳转至App'} />
  //       <Text>需要搜索的参数: {this.getProps().param}</Text>
  //     </View>
  //   )
  // }

  onCreate() {
    console.log(this.textInput);
  }

  render() {
    const NavBarTitleView = (
      <View style={styles.NavBarTitleView}>
        <SvgUri width={getSize(20)} height={getSize(20)} source={'icon_search'} />
        <WidthCloseTextInput
          ref={ref => this.textInput = ref}
          underlineColorAndroid={'transparent'}
          style={{ padding: 0, marginHorizontal: getSize(5), flex: 1, fontSize: getSize(14), color: '#333333' }}
          autoFocus={true}
          placeholder={'请输入商品名称'}
          placeholderTextColor='#bebec4'
          value={this.state.key}
          onChangeText={this.inputChange} />
      </View>
    );

    return (
      <View style={styles.container}>
        <NavBar showLeftView={false} titleView={NavBarTitleView} rightText={'取消'} rightPress={() => this.goBack()} />
        <FlatList
          data={this.state.data}
          ListHeaderComponent={() => {
            return <HotSearchCell data={this.state.data} item={hotSearch.data} select={(i) => this.showToast('')} del={() => this.showToast('')} />;
          }}
          renderItem={({ item, index }) => {
            // console.log(item, index);
            return <LatelySearchCell item={item} index={index} onPress={() => this.props.showToast(item.text)} />
          }}
          ItemSeparatorComponent={() => <SeparatorLine left={getSize(10)} width={Const.SCREEN_WIDTH - getSize(10)} />}
          keyExtractor={(item, index) => `sectionList${index}`}
          getItemLayout={(data, index) => ({ length: getSize(44), offset: getSize(44) * index, index })} />
      </View>
    )
  }

  /**
   * 输入
   */
  inputChange = (text) => {
    this.setState({ key: text });
  }
}

/**
 * 热门搜索
 * @param {*} props 
 */
const HotSearchCell = props => {
  const { data, item, select, del } = props;
  return (
    <View>
      <View style={{ paddingHorizontal: getSize(10), paddingVertical: getSize(8) }}>
        <Text style={{ marginBottom: getSize(8), color: '#6c6c6c', fontSize: getSize(13) }}>热门搜索</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            item.map((item, index) => {
              return (
                <TouchableOpacity key={`HotSearch${index}`} activeOpacity={Const.ACTIVE_OPACITY} onPress={select} style={{ justifyContent: 'center', alignItems: 'center', borderColor: Const.LINE_COLOR, borderWidth: Const.LINE_WIDTH, borderRadius: getSize(12), paddingHorizontal: getSize(6), paddingVertical: getSize(4), marginRight: getSize(8), marginBottom: getSize(8) }} >
                  <Text style={{ fontSize: getSize(11), letterSpacing: getSize(2), color: '#333333' }}>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      {data.length === 0 ? null : <View style={{ width: Const.SCREEN_WIDTH, height: getSize(5), backgroundColor: '#f1f1f1' }} />}
      {data.length === 0 ? null : <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ paddingLeft: getSize(10), color: '#6c6c6c', fontSize: getSize(13) }}>最近搜索</Text>
        <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={del} style={{ paddingVertical: getSize(8), paddingHorizontal: getSize(10) }}>
          <SvgUri width={getSize(20)} height={getSize(20)} source={'icon_del'} />
        </TouchableOpacity>
      </View>}
    </View>
  )
}

/**
 * 最近搜索
 * @param {*} props 
 */
const LatelySearchCell = props => {
  const { item, index, onPress } = props;
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress} style={{ width: Const.SCREEN_WIDTH, height: getSize(44), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: getSize(10), paddingVertical: getSize(8) }}>
      <Text style={{ fontSize: getSize(15), color: '#333333' }}>{item.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  NavBarTitleView: {
    marginLeft: getSize(10),
    width: getSize(310),
    height: getSize(30),
    paddingHorizontal: getSize(8),
    borderRadius: getSize(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f3f4f4'
  },
  NavBarColseView: {
    width: getSize(18),
    height: getSize(18),
    borderRadius: getSize(9),
    backgroundColor: '#c2c3c3',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
