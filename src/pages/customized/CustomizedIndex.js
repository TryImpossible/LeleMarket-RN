import React from 'react';

import { StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity, Animated, Easing, Image } from 'react-native';

import BaseComponent from '../../containers/BaseComponent';

import NavBar from '../../widgets/NavBar';

import { NavBarTitleView } from '../home/HomeIndex';

import ServerApi from '../../constants/ServerApi';

import SeparatorLine from '../../widgets/SeparatorLine';

import CardView from '../../widgets/CardView';

import EnhanceImage from '../../widgets/EnhanceImage';

import EnhanceList, { EnhanceListStatus } from '../../widgets/EnhanceList';

import LoadingComponent from '../../widgets/LoadingComponent';

import ErrorComponent from '../../widgets/ErrorComponent';

const PAGE_SIZE = 10;

export default class CustomizedIndex extends BaseComponent {

  constructor(props) {
    super(props);
    this.initSubscriptions();
    this.memoryBanners = []; //内存中的Banner图
    this.memoryGoods = {}; //内存中的商品
    this.selectedMenuIndex = 0; //默认菜单选中第0项
    this.pageIndex = 0; //默认，初始每一页

    this.state = {
      isRefresh: false, //是否刷新 
      status: EnhanceListStatus.pending, //enhanceList下拉状态
      menus: [], //左侧菜单分类
      banners: [], //右侧顶部Banner图
      recommendGoods: [] //右侧商品
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
   * 拉取更多商品 分页
   * @param {*} page 
   */
  loadMoreGoodsData(page) {
    let id = this.state.menus[this.selectedMenuIndex].id;
    this.setState({ status: EnhanceListStatus.loading });
    ServerApi.goods(id, page, (ret) => {
      if (ret.code == Const.REQUEST_SUCCESS) {
        let recommendGoods = deepCopy(this.state.recommendGoods.concat(ret.data));
        this.memoryGoods[id] = { page: page, data: recommendGoods }; //内存中的商品数据
        let status = this.state.status;
        let length = ret.data.length;
        if (length < PAGE_SIZE) {
          status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status = EnhanceListStatus.finish;
          this.pageIndex++;
        }
        this.setState({ recommendGoods, status, banners: deepCopy(this.state.menus[0].id !== id ? [] : this.memoryBanners) });
      } else {
        this.props.showToast(ret.message);
        this.setState({ status: EnhanceListStatus.loadMore });
      }
    }, this.props.pageName);
  }

  /**
   * 拉取商品数据 
   * @param {*} id 
   * @param {*} page 
   */
  loadGoodsData(id, page) {
    this.setState({ status: EnhanceListStatus.loading });
    this.goodsFaltList && this.goodsFaltList.scrollToOffset({ animated: false, offset: 0 });
    ServerApi.goods(id, page, (ret) => {
      if (this.state.isRefresh) this.state.isRefresh = false;
      if (ret.code == Const.REQUEST_SUCCESS) {
        let recommendGoods = ret.data;
        this.memoryGoods[id] = { page: page, data: recommendGoods }; //内存中的商品数据
        this.pageIndex++;

        let status = this.state.status;
        let length = ret.data.length;
        if (length < PAGE_SIZE) {
          status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status = EnhanceListStatus.finish;
        }
        this.setState({ recommendGoods, status, banners: deepCopy(this.state.menus[0].id !== id ? [] : this.memoryBanners) });
      } else {
        this.props.showToast(ret.message);
        this.setState({ status: EnhanceListStatus.loadMore });
      }
    }, this.props.pageName);
  }

  /**
   * 拉取菜单数据 
   */
  loadMenuData() {
    this.loadingComponent.show();
    ServerApi.menu((ret) => {
      this.loadingComponent.dismiss();
      if (ret.code == Const.REQUEST_SUCCESS) {
        this.selectedMenuIndex = 0; //默认菜单选中第0项
        this.pageIndex = 1; //此接口，已经返回 热门推荐 第一页数据，因此置为1
        this.memoryBanners = ret.data.banners; //内存中的Banner数据 
        this.memoryGoods[ret.data.menus[0].id] = { page: 0, data: ret.data.recommendGoods }; //内存中的商品数据 
        ret.data.menus = ret.data.menus.map((item, index) => ({ ...item, path: new Animated.Value(index === 0 ? 1 : 0) }));

        let status = this.state.status;
        let length = ret.data.recommendGoods.length;
        if (length < PAGE_SIZE) {
          status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status = EnhanceListStatus.finish;
        }
        this.setState({ ...ret.data, status });
      } else {
        this.props.showToast(ret.message);
        this.errorComponent.show();
      }
    }, this.props.pageName);
  }

  componentDidMount() {
    this.loadMenuData();
  }

  render() {
    //解决奇数项，单元格布局失效的问题
    let recommendGoods = [].concat(this.state.recommendGoods);
    if (recommendGoods.length % 2 !== 0) recommendGoods.push({});

    return (
      <View style={styles.container}>
        <NavBar 
          leftIcon={'icon_scan'}
          leftPress={this.jumpToScanPage}
          titleView={<NavBarTitleView search={this.jumpToSearchPage} />}
          rightIcon={'icon_msg'}
          rightPress={this.jumpToMsgPage} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <FlatList
            ref={ref => this.menuFaltList}
            style={{ backgroundColor: '#FFFFFF', width: getSize(92), borderRightWidth: Const.LINE_WIDTH, borderRightColor: '#e8e8e8' }}
            data={this.state.menus}
            renderItem={({ item, index }) => <MenuCell item={item} index={index} onPress={() => this.onMenuSelect(item, index)} />}
            keyExtractor={(item, index) => `menu${index}`} />
          <EnhanceList
            getRef={ref => this.goodsFaltList = ref}
            style={{ width: getSize(283) }}
            refreshing={this.state.isRefresh}
            onRefresh={() => {
              this.pageIndex = 0;
              this.state.isRefresh = true;
              this.loadGoodsData(this.state.menus[this.selectedMenuIndex].id, this.pageIndex);
            }}
            data={recommendGoods}
            ListHeaderComponent={() => {
              let images = this.state.banners.map((item) => item.imgUrl);
              return (
                <CardView
                  margin={{ top: getSize(6), bottom: getSize(6), left: getSize(6), right: getSize(6) }}
                  images={images}
                  width={getSize(220)}
                  height={getSize(123)}
                  onClick={(index) => this.props.showToast(`CardView${index}`)} />
              )
            }}
            numColumns={2}
            renderItem={({ item, index }) => <GoodsCell item={item} index={index} recommendGoods={this.state.recommendGoods} />}
            keyExtractor={(item, index) => `goods${index}`}
            status={this.state.status}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.loadMoreGoodsData(this.pageIndex);
            }} />
        </View>
        <LoadingComponent 
          ref={ref => this.loadingComponent = ref}
          style={{ top: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, }} />
        <ErrorComponent ref={ref => this.errorComponent = ref}
          style={{ top: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, }}
          retry={() => { 
            this.errorComponent.dismiss();
            this.loadMenuData();
          }} />
      </View>
    )
  }

  /**
   * 扫码
   */
  jumpToScanPage = () => {
    this.props.push('ScanPage');
  }

  /**
   * 搜索
   */
  jumpToSearchPage = () => {
    this.props.push('SearchPage');
  }

  /**
   * 消息
   */
  jumpToMsgPage = () => {
    this.props.push('MessagePage');
  }

  /**
   * 选中菜单
   */
  onMenuSelect = (item, index) => {
    if (this.selectedMenuIndex === index) return; //相同的选中，不响应以下逻辑

    this.state.menus[this.selectedMenuIndex].path.setValue(0);
    Animated.spring(item.path, {
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
    }).start();
    this.selectedMenuIndex = index;

    this.goodsFaltList && this.goodsFaltList.scrollToOffset({ animated: false, offset: 0 }); //自动滚动到顶部
    if (this.memoryGoods[item.id]) {
      this.pageIndex = this.memoryGoods[item.id].page + 1;
      this.setState({ recommendGoods: this.memoryGoods[item.id].data, banners: index === 0 ? this.memoryBanners : [] });
    } else {
      this.setState({
        isRefresh: true
      });
      this.pageIndex = 0;
      this.loadGoodsData(item.id, this.pageIndex);
    }
  }
}

/**
 * 每项菜单
 * @param {} props 
 */
const MenuCell = (props) => {
  let { item, index, onPress } = props;
  let hintColor = item.path.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#fe3f56']
  });
  let textColor = item.path.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333333', '#fe3f56']
  });
  let scale = item.path.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  });
  return (
    <TouchableOpacity activeOpacity={1} style={styles.menuCell} onPress={onPress} >
      <Animated.View style={[styles.menuCellHint, { backgroundColor: hintColor }]} />
      <Animated.Text style={[styles.menuCellText, { color: textColor, transform: [{ scale }] }]}>
        {item.name.slice(1, item.name.length)}
      </Animated.Text>
    </TouchableOpacity>
  )
}

/**
 * 商品
 */
const DIY_TYPE = ['', '', '可图印', '可刻字'];
const GoodsCell = (props) => {
  let { item, index, recommendGoods } = props;
  let margins = {
    marginLeft: getSize(6), marginRight: index % 2 ? getSize(6) : 0,
    marginTop: parseInt(index / 2) === 0 ? getSize(6) : 0,
    marginBottom: index / 2 !== recommendGoods.length / 2 ? getSize(6) : 0
  };
  if (JSON.stringify(item) == JSON.stringify({})) {
    return <View style={[styles.goodsCell, { backgroundColor: 'transparent', ...margins }]} />;
  } else {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.goodsCell, margins]}>
        <EnhanceImage style={{ width: getSize(130), height: getSize(120) }} source={{ uri: item.icoUrl }} resizeMode={'contain'} />
        <View style={styles.goodsCellDIYType}>
          <Text style={{ color: '#FFFFFF', fontSize: getSize(12) }}>{DIY_TYPE[item.companyId]}</Text>
        </View>
        <SeparatorLine width={getSize(130)} bottom={getSize(6)} />
        <Text style={{ color: '#333333', fontSize: getSize(13) }}>{item.name}</Text>
        <Text style={styles.goodsCellSell}>{`已定制${item.sell}件`}</Text>
        <View style={styles.goodsCellDIYText}>
          <Text style={{ color: '#fe3f56', fontSize: getSize(12) }}>{`立刻定制`}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuCell: {
    flex: 1,
    height: getSize(44),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuCellHint: {
    width: getSize(4),
    height: getSize(24)
  },
  menuCellText: {
    flex: 1,
    textAlign: 'center',
    fontSize: getSize(14),
  },
  goodsCell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
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
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(2),
    borderWidth: Const.LINE_WIDTH,
    borderColor: '#fe3f56',
    borderRadius: getSize(10)
  }
});
