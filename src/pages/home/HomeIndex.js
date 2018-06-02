import React from 'react';

import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Animated,
  Easing,
  Image,
  ScrollView
} from 'react-native';

import BaseComponent from '../../containers/BaseComponent';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import { get, post } from '../../utils/NetUtil';

import SeparatorLine from '../../widgets/SeparatorLine';

import ScrollableTabView from '../../widgets/scrollableTabView';

import EnhanceList, { EnhanceListStatus } from '../../widgets/EnhanceList';

import SimpleBanner from '../../widgets/banner';

import CardView from '../../widgets/CardView';

import ServerApi from '../../constants/ServerApi';

import LoadingView from '../../widgets/LoadingView';

import ErrorComponent from '../../widgets/ErrorComponent';

const SECTION_HEADER_TITLE = ['开启定制之旅', '定制推荐'];

const LIST_HEIGHT = Const.PAGE_HEIGHT - getSize(26) - getSize(49);

const PAGE_SIZE = 10;

export default class HomeIndex extends BaseComponent {

  static navigationOptions = ({ navigation }) => {

  }

  constructor(props) {
    super(props);
    this.initSubscriptions();
    this.memeryData = {}; //内存中的数据

    this.selectedTabIndex = 0; //上次选中的索引，默认0
    this.pageIndex = 0; //默认，初始每一页

    this.enhanceList = {}; //所有enhanceList的实例集合

    this.state = {
      scrollTabs: [], //topNav Tab集合
      selectedTab: [], //选中的Tab
      banners: [], //Banner图
      midNav: [], //Banner图下方的活动
      handpick: [], //开启定制之旅
      customization: [], //定制推荐
      recommendGoods: {}, //除 '精选' 外，其它Tab数据 

      sectionListIsRefresh: false,
      flatListIsRefresh: false,
      status: {} //enhanceList下拉状态
    };
  }

  initSubscriptions() {
    const { TabNavigation } = this.props;
    if (__ANDROID__) {
      this.willFocusSubscription = TabNavigation.addListener('willFocus', payload => {
        StatusBar.setBackgroundColor('#FFFFFF');
      });
    }
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }

  /**
   * 获取热门搜索数据 
   */
  loadHotSearchData() {
    ServerApi.getRecommand((ret) => {
      if (ret.code == Const.REQUEST_SUCCESS) {

      } else {
        this.props.showToast(ret.message);
      }
    }, this.props.pageName);
  }

  /**
   * 获取Tabs数据
   */
  loadScrollTabsData() {
    this.loadingView.show();
    ServerApi.sortHome('topNav', (ret) => {
      this.loadingView.dismiss();
      if (ret.code == Const.REQUEST_SUCCESS) {
        let scrollTabs = deepCopy(this.state.scrollTabs), status = deepCopy(this.state.status);
        ret.data.topNav.map((item, index) => {
          scrollTabs.push({ ...item });
          status[item.id] = EnhanceListStatus.pending;
        });
        this.setState({ scrollTabs, status });
      } else {
        this.props.showToast(ret.message);
        this.errorComponent.show();
      }
    }, this.props.pageName);
  }

  /**
   * 获取 精选 栏数据 
   */
  loadFocusedSelectData() {
    ServerApi.homeRevision((ret) => {
      if (this.state.sectionListIsRefresh) this.state.sectionListIsRefresh = false;
      if (ret.code == Const.REQUEST_SUCCESS) {
        if (ret.data && ret.data.topNav && ret.data.topNav[0] && ret.data.topNav[0].id) {
          this.memeryData[ret.data.topNav[0].id] = { page: 0, data: ret.data }; //保存内存中 精选 栏数据
        }

        this.selectedTabIndex = 0;
        this.setState({
          ...ret.data,
          selectedTab: ret.data.topNav,
        });
      } else {
        this.props.showToast(ret.message);
      }
    }, this.props.pageName);
  }

  loadOtherTabData(id) {
    let status = deepCopy(this.state.status);
    status[id] = EnhanceListStatus.pending;
    this.setState({ status });
    this.enhanceList && this.enhanceList[id] && this.enhanceList[id].scrollToOffset({ animated: false, offset: 0 }); //自动滚动到顶部
    ServerApi.topNavInfo(id, (ret) => {
      if (this.state.flatListIsRefresh) this.state.flatListIsRefresh = false;
      if (ret.code == Const.REQUEST_SUCCESS) {
        this.memeryData[id] = { page: this.pageIndex, data: ret.data.recommendGoods }; //内存中，保存数据 
        this.pageIndex++;

        let recommendGoods = deepCopy(this.state.recommendGoods);
        recommendGoods[id] = ret.data.recommendGoods;
        let status = deepCopy(this.state.status);
        let length = ret.data.recommendGoods.length;
        if (length < PAGE_SIZE) {
          status[id] = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status[id] = EnhanceListStatus.finish;
        }
        this.setState({ recommendGoods, status });
      } else {
        this.props.showToast(ret.message);
        let status = deepCopy(this.state.status);
        status[id] = EnhanceListStatus.loadMore;
        this.setState({ status });
      }
    }, this.props.pageName);
  }

  loadMoreOtherTabData(page) {
    let id = this.state.scrollTabs[this.selectedTabIndex].id;

    let status = deepCopy(this.state.status);
    status[id] = EnhanceListStatus.loading;
    this.setState({ status });

    ServerApi.topNavInfoByPage(id, this.pageIndex, (ret) => {
      if (ret.code == Const.REQUEST_SUCCESS) {
        let recommendGoods = deepCopy(this.state.recommendGoods);
        recommendGoods[id] = recommendGoods[id].concat(ret.data);
        this.memeryData[id] = { page: page, data: recommendGoods }; //内存中，保存数据 

        let status = deepCopy(this.state.status);
        let length = ret.data.length;
        if (length < PAGE_SIZE) {
          status[id] = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status[id] = EnhanceListStatus.finish;
          this.pageIndex++;
        }
        this.setState({ recommendGoods, status });
      } else {
        this.props.showToast(ret.message);
        let status = deepCopy(this.state.status);
        status[id] = EnhanceListStatus.loadMore;
        this.setState({ status });
      }
    }, this.props.pageName);
  }

  componentDidMount() {
    this.loadHotSearchData();
    this.loadScrollTabsData();
    this.loadFocusedSelectData();
  }

  onTopNavSelected(item, index) {
    if (this.selectedTabIndex === index) return; //相同的选中，不响应以下逻辑
    this.selectedTabIndex = index; //赋值选中的Index

    this.pageIndex = 0;
    if (this.memeryData[item.id]) {
      this.pageIndex = this.memeryData[item.id].page + 1;
    } else {
      this.setState({
        flatListIsRefresh: true
      });
      this.loadOtherTabData(item.id);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar leftIcon={'icon_scan'} leftPress={this.jumpToScanPage} titleView={<NavBarTitleView search={this.jumpToSearchPage} />} rightIcon={'icon_msg'} rightPress={this.jumpToMsgPage} showBottomLine={false} />
        <ScrollableTabView
          tabs={this.state.scrollTabs.map((item, index) => item.name)}
          tabBarStyle={{ borderBottomWidth: Const.LINE_WIDTH, borderBottomColor: Const.LINE_COLOR, height: getSize(26) }}
          tabBarTextStyle={{ fontSize: getSize(12) }}
          tabBarBackgroundColor={'#fff'}
          tabBarActiveTextColor={'#fe3f56'}
          tabBarInactiveTextColor={'#333333'}
          tabBarUnderlineStyle={{ height: getSize(2) }}
          onScrollEnd={index => {
            this.onTopNavSelected(this.state.scrollTabs[index], index);
          }}>
          {
            this.state.scrollTabs.map((item, index) => {
              if (index === 0 && item.id == 1 && item.name === '精选') {
                let sections = [
                  { key: 0, data: [{ key: 0, data: this.state.handpick }] },
                  { key: 1, data: this.state.customization.map((item, index) => ({ ...item, key: 1 })) },
                ];
                return (
                  <View key={`ScrollableTabView${index}`} style={{ width: Const.SCREEN_WIDTH, height: LIST_HEIGHT }}>
                    <SectionList
                      style={{ width: Const.SCREEN_WIDTH, height: LIST_HEIGHT }}
                      sections={sections}
                      refreshing={this.state.sectionListIsRefresh}
                      onRefresh={() => {
                        this.state.sectionListIsRefresh = true;
                        this.loadFocusedSelectData();
                      }}
                      stickySectionHeadersEnabled={false}
                      ListHeaderComponent={() => {
                        let images = this.state.banners.map((item, index) => item.imgUrl);
                        return (
                          <View>
                            <SimpleBanner images={images} height={getSize(150)} duration={5000} autoPlay={true} autoLoop={true} onClick={(index) => this.props.showToast(`您选中了第${index}张`)} />
                            <GridActivity data={this.state.midNav} onPress={() => this.props.showToast('activity')} />
                          </View>
                        )
                      }}
                      renderSectionHeader={({ section }) => <SectionHeader section={section} />}
                      renderItem={({ item, index }) => {
                        if (item.key === 0) {
                          //开启定制之旅
                          let images = item.data.map((item) => item.imgUrl);
                          return (
                            <CardView
                              style={{ backgroundColor: '#ffffff' }}
                              images={images}
                              width={getSize(315)}
                              height={getSize(150)}
                              borderRadius={getSize(10)}
                              onClick={(index) => this.props.showToast(`CardView${index}`)} />
                          )
                        } else if (item.key == 1) {
                          //定制推荐
                          return <Customization item={item} index={index} customization={this.state.customization} />;
                        }
                        return null;
                      }}
                      keyExtractor={(item, index) => `sectionList${index}`} />
                  </View>
                )
              } else {
                //解决奇数项，单元格布局失效的问题
                let data = [].concat(this.state.recommendGoods[item.id]);
                if (data.length % 2 !== 0) data.push({});
                return (
                  <View key={`ScrollableTabView${index}`} style={{ width: Const.SCREEN_WIDTH, height: LIST_HEIGHT }} >
                    <EnhanceList
                      getRef={ref => this.enhanceList[item.id] = ref}
                      style={{ width: Const.SCREEN_WIDTH, height: LIST_HEIGHT }}
                      refreshing={this.state.flatListIsRefresh}
                      onRefresh={() => {
                        this.pageIndex = 0;
                        this.state.flatListIsRefresh = true;
                        this.loadOtherTabData(this.state.scrollTabs[this.selectedTabIndex].id);
                      }}
                      data={data}
                      horizontal={false}
                      numColumns={2}
                      renderItem={({ item, index }) => <GoodsCell item={item} index={index} />}
                      keyExtractor={(item, index) => `goods${index}`}
                      status={this.state.status[item.id]}
                      onEndReachedThreshold={0.5}
                      onEndReached={() => {
                        this.loadMoreOtherTabData(this.pageIndex);
                      }} />
                    </View>
                )
              }
            })
          }
        </ScrollableTabView>

        <LoadingView 
          ref={ref => this.loadingView = ref}
          style={{ top: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, }}
          color={'#8cadca'} />
        <ErrorComponent ref={ref => this.errorComponent = ref}
          style={{ top: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, }}
          retry={() => { 
            this.errorComponent.dismiss();
            this.loadScrollTabsData();
            this.loadFocusedSelectData();
          }} />
      </View>
    )
  }

  jumpToScanPage = () => {
    this.props.push('ScanPage');
  }

  jumpToSearchPage = () => {
    this.props.push('SearchPage');
  }

  jumpToMsgPage = () => {
    if (__IOS__) return;
    this.props.push('RichEditorPage');
  }
}

/**
 * 搜索框
 * @param {} props 
 */
export const NavBarTitleView = (props) => {
  const { search } = props;
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} style={styles.searchView} onPress={search}>
      <SvgUri width={getSize(20)} height={getSize(20)} source={'icon_search'} />
      <Text style={{ fontSize: getSize(12), color: '#C7C7C9', marginLeft: getSize(6) }}>{`请输入商品名称`}</Text>
    </TouchableOpacity>
  )
}

/**
 * 活动
 * @param {*} props 
 */
const GridActivity = (props) => {
  let { data, onPress } = props;
  return (
    <View style={styles.gridActivity}>
      {
        data.map((item, index) => (
          <TouchableOpacity key={`gridActivity${index}`} style={styles.gridActivityItem} activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress}>
            <Image style={{ width: getSize(36), height: getSize(36), marginBottom: getSize(5) }} source={{ uri: item.imgUrl }} />
            <Text style={{ color: '#333333', fontSize: getSize(10) }}>{item.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

/**
 * 每组的标题
 * @param {*} props 
 */
const SectionHeader = (props) => {
  let { section } = props;
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionHeaderMiddleLine, { marginRight: getSize(8) }]} />
      <Text style={{ color: '#333333', fontSize: getSize(13), letterSpacing: getSize(2) }}>{SECTION_HEADER_TITLE[section.key]}</Text>
      <View style={[styles.sectionHeaderMiddleLine, { marginLeft: getSize(8) }]} />
    </View>
  )
}



/**
 * 定制推荐
 * @param {*} props 
 */
const Customization = (props) => {
  let { item, index, customization } = props;
  return (
    <View style={{ backgroundColor: '#ffffff', marginBottom: index === customization.length - 1 ? 0 : getSize(10) }}>
      <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} >
        <Image style={{ width: Const.SCREEN_WIDTH, height: getSize(150) }} source={{ uri: item.imgUrl }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        {
          item.goods.map((child, index) => {
            if (index > 2) {
              return null
            } else {
              return (
                <View key={`aaa${index}`} style={{ flex: 1, alignItems: 'center' }}>
                  <Image style={{ width: getSize(130), height: getSize(120), marginBottom: getSize(8) }} source={{ uri: child.imgUrl }} resizeMode={'contain'} />
                  <Text numberOfLines={1} style={{ color: '#808080', fontSize: getSize(13), marginBottom: getSize(5) }}>{child.param1}</Text>
                  <View style={styles.shadowButton}>
                    <Text style={{ color: '#a9a9a9', fontSize: getSize(12) }}>{`去定制`}</Text>
                  </View>
                </View>
              )
            }
          })
        }

      </View>
    </View>
  )
}

/**
 * 商品
 */
const DIY_TYPE = ['', '', '可图印', '可刻字'];
const GoodsCell = (props) => {
  let { item, index } = props;
  let margins = {
    marginTop: parseInt(index / 2) == 0 ? getSize(6) : 0,
    marginLeft: index % 2 === 1 ? getSize(6) : 0,
  };
  if (JSON.stringify(item) == JSON.stringify({})) {
    return <View style={[styles.goodsCell, { backgroundColor: 'transparent', ...margins }]} />;
  }
  return (
    <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} style={[styles.goodsCell, { ...margins }]}>
      <Image style={{ width: getSize(182), height: getSize(200) }} source={{ uri: item.icoUrl }} resizeMode={'contain'} />
      <View style={styles.goodsCellDIYType}>
        <Text style={{ color: '#FFFFFF', fontSize: getSize(12) }}>{DIY_TYPE[item.companyId]}</Text>
      </View>
      <SeparatorLine width={getSize(182)} bottom={getSize(6)} />
      <Text style={{ color: '#333333', fontSize: getSize(13) }}>{item.name}</Text>
      <Text style={styles.goodsCellSell}>{`已定制${item.sell}件`}</Text>
      <View style={styles.goodsCellDIYText}>
        <Text style={{ color: '#fe3f56', fontSize: getSize(12) }}>{`开始定制`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  searchView: {
    width: getSize(280),
    height: getSize(28),
    backgroundColor: '#F5F5F5',
    borderRadius: getSize(18),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: getSize(5)
  },
  scrollTabs: {
    width: Const.SCREEN_WIDTH,
    height: getSize(26),
    backgroundColor: '#FFFFFF',
    borderBottomColor: Const.LINE_COLOR,
    borderBottomWidth: Const.LINE_WIDTH
  },
  gridActivity: {
    backgroundColor: '#ffffff',
    width: Const.SCREEN_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridActivityItem: {
    width: getSize(93),
    height: getSize(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: {
    backgroundColor: '#ffffff',
    width: Const.SCREEN_WIDTH,
    height: getSize(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeaderMiddleLine: {
    width: getSize(22),
    height: Const.LINE_WIDTH,
    backgroundColor: '#969696',
  },
  shadowButton: {
    marginBottom: getSize(10),
    borderColor: Const.LINE_COLOR,
    borderWidth: Const.LINE_WIDTH,
    borderRadius: getSize(8),
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(3),
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0.5 },
    elevation: 3,
    backgroundColor: '#f7f7f7'
  },
  goodsCell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: getSize(6)
  },
  goodsCellDIYType: {
    paddingHorizontal: getSize(5),
    paddingVertical: getSize(2),
    marginLeft: getSize(10),
    marginBottom: getSize(6),
    backgroundColor: '#fe3f56',
    alignSelf: 'flex-start'
  },
  goodsCellSell: {
    color: '#979797',
    fontSize: getSize(11),
    marginTop: getSize(4),
    marginBottom: getSize(6)
  },
  goodsCellDIYText: {
    marginBottom: getSize(8),
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(2),
    borderWidth: Const.LINE_WIDTH,
    borderColor: '#fe3f56',
    borderRadius: getSize(10)
  }
});
