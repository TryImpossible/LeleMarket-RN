import React from 'react';

import { StatusBar, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import BaseComponent from '../../containers/BaseComponent';

import NavBar from '../../widgets/NavBar';

import { post } from '../../utils/NetUtil';

import SeparatorLine from "../../widgets/SeparatorLine";

import EnhanceList, { EnhanceListStatus } from '../../widgets/EnhanceList';

import EnhanceImage from '../../widgets/EnhanceImage'

import ServerApi from '../../constants/ServerApi';

//列表头部图片
const LIST_HEADER_IMGS = [
  `${Const.HOST}v3.0.0/images/discovery/ios-taobao.png`,
  `${Const.HOST}v3.0.0/images/discovery/ios-haowu.png`,
  `${Const.HOST}v3.0.0/images/discovery/ios-zpq.png`
];

const PAGE_SIZE = 8;

export default class DiscoverIndex extends BaseComponent {

  constructor(props) {
    super(props);
    this.initSubscriptions();
    this.pageIndex = 0; //默认，第一页
    this.state = {
      isRefresh: false, //是否刷新 
      status: EnhanceListStatus.pending, //enhanceList下拉状态
      data: [], //列表数据
    }
  }

  initSubscriptions() {
    const {TabNavigation} = this.props;
    if (__ANDROID__){
      this.willFocusSubscription = TabNavigation.addListener( 'willFocus', payload => {
        StatusBar.setBackgroundColor('#FFFFFF');
      });
    } 
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }

  loadFindListData() {
    ServerApi.findList(this.pageIndex, (ret) => {
      if (this.state.isRefresh) this.state.isRefresh = false;
      if (ret.code == Const.REQUEST_SUCCESS) {
        let data = deepCopy(this.pageIndex === 0 ? ret.data.slice(0, ret.data.length - 3) : ret.data);
        let status = this.state.status;
        let length = data.length;
        if (length < PAGE_SIZE) {
          status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status = EnhanceListStatus.finish;
        }
        this.setState({ data, status });
        this.pageIndex++;
      } else {
        this.props.showToast(ret.message);
        this.setState({ status: EnhanceListStatus.loadMore });
      }
    }, this.props.pageName);
  }

  loadMoreFindListData() {
    this.setState({ status: EnhanceListStatus.loading });
    ServerApi.findList(this.pageIndex, (ret) => {
      if (ret.code == Const.REQUEST_SUCCESS) {
        let status = this.state.status;
        let length = ret.data.length;
        if (length < PAGE_SIZE) {
          status = EnhanceListStatus.noMoreData;
        } else if (length === PAGE_SIZE) {
          status = EnhanceListStatus.finish;
          this.pageIndex++;
        }
        let data = deepCopy(this.state.data.concat(ret.data));
        this.setState({ data, status });
      } else {
        this.props.showToast(ret.message);
        this.setState({ status: EnhanceListStatus.loadMore });
      }
    }, this.props.pageName);
  }

  componentDidMount() {
    this.setState({ isRefresh: true });
    this.loadFindListData();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar leftIcon={''} title={'发现'} />
        <EnhanceList
          ref={ref => this.faltList = ref}
          refreshing={this.state.isRefresh}
          onRefresh={() => {
            this.pageIndex = 0;
            this.state.isRefresh = true;
            this.loadFindListData()
          }}
          data={this.state.data}
          ListHeaderComponent={() => { 
            const taobaoSpeciaUrl = `${Const.HOST}v3.0.0/subjects/taobaoSpecialList.html`; //淘一淘
            return <ListHeader onPress={(index) => {
              switch (index) {
                case 0:
                  this.props.push('DIYWebViewPage', { navTitle: '', source: { uri: taobaoSpeciaUrl }})
                  break;
              
                default:
                  break;
              }
            }} />;
          }}
          renderItem={({ item, index }) => {
            const diyringUrl = `http://iring.diyring.cc/friend/252e5ed28264e505?token=C80368AB-0663-4E81-B593-1C3374EA7197&appId=1105250240`;
            const detailUrl = `${Const.HOST}v3.0.0/subjects/discovery-detail.html?id=${item.id}`;
            return <DiscoverCell item={item} onPress={() => this.props.push('DIYWebViewPage', { navTitle: '', source: { uri: item.type === 3 ? diyringUrl : detailUrl }})} />
          }}
          ItemSeparatorComponent={({ highlighted, leadingItem }) => <SeparatorLine />}
          keyExtractor={(item, index) => `Discover${index}`}
          getItemLayout={(data, index) => ({ length: getSize(120), offset: getSize(120) * index, index })}
          status={this.state.status}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.loadMoreFindListData(this.pageIndex);
          }} />
      </View>
    )
  }
}

const ListHeader = (props) => {
  const { onPress } = props;
  return (
    <View style={styles.listHeader}>
      <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => onPress && onPress(0)}>
        <EnhanceImage style={{ width: getSize(185), height: getSize(160) }} source={{ uri: LIST_HEADER_IMGS[0] }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => onPress && onPress(1)}>
          <EnhanceImage style={{ width: getSize(190), height: getSize(80) }} source={{ uri: LIST_HEADER_IMGS[1] }} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={() => onPress && onPress(2)}>
          <EnhanceImage style={{ width: getSize(190), height: getSize(80) }} source={{ uri: LIST_HEADER_IMGS[2] }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const DiscoverCell = (props) => {
  const { item, onPress } = props;
  if (item.type == 3) {
    return (
      <TouchableOpacity activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress}>
        <EnhanceImage style={{  backgroundColor: '#fff', width: Const.SCREEN_WIDTH, height: getSize(120) }} source={{ uri: item.img }} resizeMode="stretch" />
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity style={styles.discoverCell} activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress}>
        <EnhanceImage style={{ width: getSize(90), height: getSize(90), marginRight: getSize(15) }} source={{ uri: item.img }} resizeMode="stretch" />
        <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'center' }}>
          <Text style={{ fontSize: getSize(15), color: '#000000', textAlign: 'center' }} numberOfLines={2}>{item.title}</Text>
          <Text style={{ fontSize: getSize(13), color: '#969696', marginVertical: getSize(8) }}>
            {`阅读 ${item.view}${item.ctime ? ` | ${item.ctime}` : ''}`}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: getSize(24), height: getSize(24), borderRadius: getSize(12), marginRight: getSize(3) }} source={{ uri: item.headImg }} resizeMode="contain"/>
            <Text style={{ fontSize: getSize(12), color: '#969696' }}>{item.author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Const.MAIN_COLOR
  },
  listHeader: {
    width: Const.SCREEN_WIDTH,
    height: getSize(160),
    marginBottom: getSize(5),
    flexDirection: 'row',
    backgroundColor: '#f5f5f5'
  },
  discoverCell: {
    backgroundColor: '#ffffff',
    width: Const.SCREEN_WIDTH,
    height: getSize(120),
    flexDirection: 'row',
    padding: getSize(15)
  },
});