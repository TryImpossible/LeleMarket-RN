import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  SectionList,
  TouchableOpacity,
  requireNativeComponent,
  propTypes,
  processColor, //字符Color转换为数字 
  Animated,
  Easing,
  InteractionManager
} from 'react-native';

import BasePage from '../BasePage';

import EnhanceStatusBar from '../../widgets/EnhanceStatusBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import SeparatorLine from '../../widgets/SeparatorLine';

import EnhanceList, { EnhanceListStatus } from '../../widgets/EnhanceList';

import ServerApi from '../../constants/ServerApi';

import hotSearch from './hotSearch.json';

import WithCloseHOC from '../../widgets/HOC/WithCloseHOC';

import EnhanceImage from '../../widgets/EnhanceImage';

const WidthCloseTextInput = WithCloseHOC(TextInput);

const SectionListData = [
  {
    key: `section0`,
    data: [
      {
        key: `section0`,
        hotSearch: hotSearch.data
      }
    ],
  },
  {
    key: `section1`,
    data: [
      { key: `section1`, text: '巧克力' },
      { key: `section1`, text: '衣服' },
      { key: `section1`, text: '服装' },
      { key: `section1`, text: 'cosplay' },
      { key: `section1`, text: '天涯明月刀' },
      { key: `section1`, text: '天涯明月刀 cosplay' }
    ]
  },
]

const SectionListHeaderTitle = { 'section0': '热门搜索', 'section1': '最近搜索' };

const PAGE_SIZE = 7;

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);

    this.pageIndex = 0;
    this.navPath = new Animated.Value(0);
    this.state = {
      key: '',
      sections: SectionListData,
      inputSearchData: [], //输入智能提示
      searchGoodsData: [], //商品信息
      isRefresh: false,
      status: EnhanceListStatus.pending
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

  /**
   * 输入智能搜索
   */
  inputSearch(key) {
    ServerApi.getKeyword(key, ret => {
      let inputSearchData = [];
      if (ret.code == Const.REQUEST_SUCCESS) {
        inputSearchData = ret.data;
      } else {

      }
      this.setState({ sections: [], inputSearchData, searchGoodsData: [] });
    }, this.getPageName());
  }

  /**
   * 搜索商品
   */
  searchGoodsInfo(key) {
    this.pageIndex !== 0 && this.setState({ status: EnhanceListStatus.loading });
    ServerApi.getGoodsInfo('', this.pageIndex, key, ret => {
      if (ret.code == Const.REQUEST_SUCCESS || ret.code == 400) {
        this.cahceSearchGoodsData = ret.data; //缓存中的搜索结果 
        let searchGoodsData = this.pageIndex === 0 ? ret.data : this.state.searchGoodsData.concat(ret.data);
        let length = ret.data.length;
        if (length < PAGE_SIZE) {
          this.state.status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          this.state.status = EnhanceListStatus.finish;
          this.pageIndex++;
        }
        this.setState({ sections: [], inputSearchData: [], searchGoodsData, status: this.state.status });
      } else {
        this.setState({ status: EnhanceListStatus.loadMore });
      } 
    }, this.getPageName());
  }

  onCreate() {

  }

  /**
   * 导航，搜索栏
   */
  renderNavBar() {
    const backIconLeft = this.navPath.interpolate({ inputRange: [0, 1], outputRange: [-getSize(44), 0] }); //返回箭头，距离左边位置
    const backIconOpacity = this.navPath.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }); //返回箭头，透明变化 
    return (
      <View style={{ width: Const.SCREEN_WIDTH, height: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, flexDirection: 'column' }}>
        <EnhanceStatusBar backgroundColor={'#FFF'} />
        <View style={{ height: Const.NAVBAR_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
          <Animated.View style={{ marginLeft: backIconLeft, opacity: backIconOpacity }}>
            <TouchableOpacity style={{ paddingHorizontal: getSize(10), minWidth: getSize(44) }} activeOpacity={Const.ACTIVE_OPACITY} onPress={() => this.pop()}>
              <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_nav_bar_back'} />
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.NavBarTitleView}>
            <SvgUri width={getSize(20)} height={getSize(20)} source={'icon_search'} />
            <WidthCloseTextInput
              ref={ref => this.textInput = ref}
              underlineColorAndroid={'transparent'}
              style={styles.widthCloseTextInput}
              autoFocus={true}
              placeholder={'请输入商品名称'}
              placeholderTextColor='#bebec4'
              defaultValue={this.state.key}
              value={this.state.key}
              onFocus={() => {
                //存在搜索关键字时，隐藏返回按钮、显示关闭按钮、搜索
                if (this.state.key && this.state.key.length > 0) {
                  this._hideBackIcon();
                  this.textInput.showCloseIcon();
                  InteractionManager.runAfterInteractions(() => {
                    this.inputSearch(this.state.key);
                  });
                }
              }}
              onChangeText={(text) => {
                //输入变化时，隐藏 返回 按钮
                this._hideBackIcon();
                InteractionManager.runAfterInteractions(() => {
                  this._inputChange(text);
                })
              }}
              onClose={() => {
                //关闭时，展示默认的分组列表
                this._inputChange('');
              }}
              returnKeyType={'search'}
              returnKeyLabel={'search'}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                this._showBackIcon();
                InteractionManager.runAfterInteractions(() => {
                  this.searchGoodsInfo(this.state.key);
                });
              }} />
          </View>
          <TouchableOpacity style={{ paddingHorizontal: getSize(10), minWidth: getSize(44) }}
            activeOpacity={Const.ACTIVE_OPACITY}
            onPress={() => {
              if (this.cahceSearchGoodsData) {
                this._showBackIcon();
                this.setState({ key: this.cahceKey, sections: [], inputSearchData: [], searchGoodsData: this.cahceSearchGoodsData });
              } else {
                this.pop();
              }
            }}>
            <Text style={{ color: '#666666', fontSize: getSize(16) }}>{'取消'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /**
   * 默认展示列表
   */
  renderDefaultShowList() {
    return (
      this.state.sections.length > 0 &&
      <SectionList
        style={{ width: Const.SCREEN_WIDTH, height: Const.PAGE_HEIGHT }}
        sections={this.state.sections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => `sectionList${index}`}
        renderSectionHeader={({ section }) => <SectionHeader section={section} del={this._del} />}
        ItemSeparatorComponent={() => <SeparatorLine left={getSize(10)} width={Const.SCREEN_WIDTH - getSize(10)} />}
        renderItem={({ item, index }) => {
          if (item.key === 'section0') {
            return <HotSearchCell sections={this.state.sections} item={item.hotSearch} select={(i) => { this._showBackIcon(); this._search(item.hotSearch[i].name) }} />;
          } else if (item.key === 'section1') {
            return <LatelySearchCell item={item} index={index} onPress={() => { this._showBackIcon(); this._search(item.text) }} />
          } else {
            return null;
          }
        }}
      />
    )
  }

  /**
   * 输入展示的列表
   */
  renderInputList() {
    return (
      this.state.inputSearchData.length > 0 &&
      <FlatList
        style={{ width: Const.SCREEN_WIDTH, height: Const.PAGE_HEIGHT, backgroundColor: '#fff' }}
        keyExtractor={(item, index) => `inputSearchList${index}`}
        // ItemSeparatorComponent={() => <SeparatorLine left={getSize(10)} width={Const.SCREEN_WIDTH - getSize(10)} />}
        getItemLayout={(data, index) => ({ length: getSize(50), offset: getSize(50) * index, index })}
        data={this.state.inputSearchData}
        renderItem={({ item, index }) => <InputSearchCell item={item} index={index} onSearch={(key) => { this._showBackIcon(); this._search(key) }} />}
      />
    )
  }

  renderGoodsList() {
    return (
      this.state.searchGoodsData.length > 0 &&
      <EnhanceList
        style={{ width: Const.SCREEN_WIDTH, backgroundColor: '#f5f5f5' }}
        keyExtractor={(item, index) => `GoodsList${index}`}
        getItemLayout={(data, index) => ({ length: getSize(115), offset: getSize(115) * index, index })}
        data={this.state.searchGoodsData}
        renderItem={({ item, index }) => {
          return (
            <View style={{ backgroundColor: '#fff', width: Const.SCREEN_WIDTH - getSize(12), height: getSize(115), marginHorizontal: getSize(6), marginTop: index === 0 ? getSize(6) : 0, marginBottom: getSize(6), padding: getSize(12), flexDirection: 'row' }}>
              <EnhanceImage style={{ width: getSize(103), height: getSize(103) }} source={{ uri: item.iconUrl }} />
              <View style={{ flex: 1, marginLeft: getSize(10) }}>
                <Text numberOfLines={2} style={{ fontSize: getSize(16), color: '#333333', lineHeight: getSize(20) }}>{item.saleTitle}</Text>
                <Text numberOfLines={1} style={{ marginTop: getSize(10), fontSize: getSize(15), color: '#a1a1a1' }}>{item.name}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: getSize(15), color: '#636363' }}>
                    {`已定制`}
                    <Text style={{ fontSize: getSize(15), color: '#fe3f56' }}>{` ${item.sell} `}</Text>
                    {`件`}
                  </Text>
                  <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} style={{ backgroundColor: '#fe3f56', borderRadius: getSize(12), paddingHorizontal: getSize(10), paddingVertical: getSize(5) }} >
                    <Text style={{ color: '#fff', fontSize: getSize(13) }}>{`立即定制`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.pageIndex = 0;
          this.searchGoodsInfo(this.state.key);
        }}
        status={this.state.status}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          this.searchGoodsInfo(this.state.key);
        }}
        noMoreDataText={'没有数据了'} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderDefaultShowList()}
        {this.renderInputList()}
        {this.renderGoodsList()}
      </View>
    )
  }

  /**
   * 显示 返回 按钮
   */
  _showBackIcon() {
    if (Math.round(this.navPath._value) === 0) {
      Animated.timing(this.navPath, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  /**
   * 隐藏 返回 按钮
   */
  _hideBackIcon() {
    if (Math.round(this.navPath._value) === 1) {
      Animated.timing(this.navPath, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  /**
   * 输入
   */
  _inputChange = (text) => {
    this.setState({ key: text });
    if (!text || text.length === 0) {
      this.setState({ sections: SectionListData, inputSearchData: [], searchGoodsData: [] });
    } else {
      this.inputSearch(text);
    }
  }

  /**
   * 清除最近搜索
   */
  _del = () => {
    let sections = deepCopy(this.state.sections);
    sections.splice(1, 1);
    this.setState({ sections: sections });
  }

  /**
   * 搜索
   */
  _search = (key) => {
    this.cahceKey = key; //缓存中的关键字
    this.setState({ key });
    this.searchGoodsInfo(key);
  }

}

/**
 * 分组
 * @param {*} props 
 */
const SectionHeader = props => {
  const { section, del } = props;
  return (
    <View style={styles.sectionHeader}>
      <Text style={{ color: '#6c6c6c', fontSize: getSize(13) }}>{SectionListHeaderTitle[section.key]}</Text>
      {
        section.key === 'section1'
          ?
          <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={del}>
            <SvgUri width={getSize(20)} height={getSize(20)} source={'icon_del'} />
          </TouchableOpacity>
          :
          null
      }
    </View>
  );
}

/**
 * 热门搜索
 * @param {*} props 
 */
const HotSearchCell = props => {
  const { sections, item, select } = props;
  return (
    <View>
      <View style={styles.hotSearchCell}>
        {
          item.map((item, index) => {
            return (
              <TouchableOpacity key={`HotSearch${index}`} activeOpacity={Const.ACTIVE_OPACITY} onPress={() => select && select(index)} style={styles.hotSearchCellButton} >
                <Text style={{ fontSize: getSize(11), letterSpacing: getSize(2), color: '#333333' }}>{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      {sections.length > 1 ? <View style={{ width: Const.SCREEN_WIDTH, height: getSize(5), backgroundColor: '#f1f1f1' }} /> : null}
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
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress} style={styles.latelySearchCell}>
      <Text style={{ fontSize: getSize(15), color: '#333333' }}>{item.text}</Text>
    </TouchableOpacity>
  );
}

/**
 * 输入搜索
 * @param {*} props 
 */
const InputSearchCell = props => {
  const { item, index, onSearch } = props;
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => onSearch && onSearch(item.name)} style={styles.inputSearchCell}>
      <Text numberOfLines={1} style={styles.inputSearchCellTitle}>{item.name}</Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {item.keywords.map((child, i) => {
          return (
            <TouchableOpacity key={`subBtn${i}`} activeOpacity={Const.ACTIVE_OPACITY} style={styles.inputSearchCellButton}
              onPress={() => onSearch && onSearch(`${item.name} ${child.name}`)}>
              <Text style={{ fontSize: getSize(12), color: '#969696' }}>{child.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </TouchableOpacity>
  )
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
  widthCloseTextInput: {
    padding: 0,
    marginHorizontal: getSize(5),
    flex: 1,
    fontSize: getSize(14),
    color: '#333333'
  },
  sectionHeader: {
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hotSearchCell: {
    paddingHorizontal: getSize(10),
    paddingBottom: getSize(16),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hotSearchCellButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Const.LINE_COLOR,
    borderWidth: Const.LINE_WIDTH,
    borderRadius: getSize(12),
    paddingHorizontal: getSize(6),
    paddingVertical: getSize(4),
    marginRight: getSize(8),
    marginBottom: getSize(8)
  },
  latelySearchCell: {
    width: Const.SCREEN_WIDTH,
    height: getSize(44),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(8)
  },
  inputSearchCell: {
    width: Const.SCREEN_WIDTH,
    height: getSize(44),
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputSearchCellTitle: {
    marginHorizontal: getSize(10),
    fontSize: getSize(15),
    color: '#1e1e1e',
    maxWidth: getSize(150)
  },
  inputSearchCellButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize(2),
    backgroundColor: '#f1f1f1',
    paddingHorizontal: getSize(5),
    paddingVertical: getSize(3),
    marginRight: getSize(10)
  }
});
