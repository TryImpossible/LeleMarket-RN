import React from 'react';

import { StatusBar, StyleSheet, View, Text, SectionList, TouchableOpacity, Animated } from 'react-native';

import BaseComponent from '../../containers/BaseComponent';

import SvgUri from '../../dependencies/react-native-svg-uri';

import EnhanceStatusBar from '../../widgets/EnhanceStatusBar';

import EnhanceButton from '../../widgets/EnhanceButton';

import SeparatorLine from '../../widgets/SeparatorLine';

//列表数据
const SECTION_LIST_DATA = [
  {
    data: [
      {
        key: `section0`,
        data: [{ icon: 'icon_mine_wait_pay', text: '待付款' },
        { icon: 'icon_mine_wait_send_goods', text: '待发货' },
        { icon: 'icon_mine_wait_delivery', text: '待收货' },
        { icon: 'icon_mine_wait_evaluate', text: '待评价' },
        { icon: 'icon_mine_all_orders', text: '全新订单' }]
      }
    ],
    key: `section0`
  },
  {
    data: [
      { key: `section1`, icon: 'icon_mine_ticket', text: '我的礼券' },
      { key: `section1`, icon: 'icon_mine_act', text: '我的作品' },
      { key: `section1`, icon: 'icon_mine_friend', text: '我的好友' },
      { key: `section1`, icon: 'icon_mine_address', text: '收货地址' },
      { key: `section1`, icon: 'icon_mine_service', text: '客服和售后' }
    ],
    key: `section1`
  },
  {
    data: [
      { key: `section2`, icon: 'icon_mine_scan', text: '扫乐唯码' },
      { key: `section2`, icon: 'icon_mine_more', text: '更多' }
    ],
    key: `section2`
  }
];

const HEADER_HEIGHT = getSize(180); //头部高度

export default class MineIndex extends BaseComponent {

  constructor(props) {
    super(props);
    this.opacityPath = new Animated.Value(0);
    this.scalePath = new Animated.Value(1);
    this.initSubscriptions();
  }

  initSubscriptions() {
    const { TabNavigation } = this.props;
    if (__ANDROID__) {
      this.subscriptions = [
        TabNavigation.addListener('willFocus', payload => {
          StatusBar.setBackgroundColor('#FB4950');
        }),
        TabNavigation.addListener('willBlur', payload => {
          StatusBar.setBackgroundColor('#FFFFFF');
        })
      ]
    }
  }

  componentWillUnmount() {
    this.subscriptions && this.subscriptions.forEach(sub => sub.remove());
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.maskView, { transform: [{ scaleY: this.scalePath }] }]} />
        <SectionList
          ref={ref => this.sectionList = ref}
          style={{ flex: 1 }}
          contentContainerStyle={{ backgroundColor: Const.MAIN_COLOR }}
          sections={SECTION_LIST_DATA}
          ListHeaderComponent={() => <ListHeaderView onLogin={this.jumpToLoginPage} />}
          ListFooterComponent={() => <ListFooterView />}
          renderItem={({ item, index }) => {
            if (item.key === 'section0') {
              return <MineButtonsCell item={item} index={index} onPress={(index) => this.onButtonItemPress(index)} />;
            } else {
              return <MineArrowItemCell item={item} index={index} onPress={() => this.onArrowItemPress(item.key, index)} />
            }
          }}
          ItemSeparatorComponent={() => <SeparatorLine left={getSize(10)} width={Const.SCREEN_WIDTH - getSize(10)} />}
          keyExtractor={(item, index) => `sectionList${index}`}
          onScroll={({ nativeEvent }) => {
            let scaleratio = 1 - nativeEvent.contentOffset.y / HEADER_HEIGHT; //拉伸比例
            this.scalePath.setValue(Math.abs(scaleratio));

            let opacityratio = nativeEvent.contentOffset.y / getSize(86); //透明度比例, getSize(86)是头像向上滑动消失的偏移量
            this.opacityPath.setValue(opacityratio);
          }} />
        <NavBar opacity={this.opacityPath} />
        <TouchableOpacity style={styles.navBarSvg} opacity={Const.ACTIVE_OPACITY} onPress={this.jumpToMsgPage}>
          <SvgUri width={24} height={24} source={'icon_msg'} fill={'#FFFFFF'} />
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * 订单状态Button点击
   * @param {*} index 
   */
  onButtonItemPress(index) {
    this.props.push('LoginPage');
  }

  /**
   * 箭头行点击
   * @param {*} key 
   * @param {*} index 
   */
  onArrowItemPress(key, index) {
    if (key === 'section1') {
      switch (index) {
        case 0:
          this.props.push('LoginPage');
          break;
        case 1:
          this.props.showToast('个人作品');
          break;
        case 2:
          this.props.showToast('我的好友');
          break;
        case 3:
          this.props.push('LoginPage');
          break;
        case 4:
          this.props.push('DIYWebViewPage', {
            navTitle: '客服中心',
            source: { uri: `${Const.HOST}xielei/leleDiy/Customer-service.html` }
          });
          break;
        default:
          break;
      }

      // https://api.51app.cn/diyMall/v3.0.0/others/aboutUs-lele.html 关于我们
      // https://api.51app.cn/diyMall/v3.0.0/others/businessCooperation.html 商务合作
      // https://api.51app.cn/diyMall/v3.0.0/others/copyRight-lele.html 版权
    } else if (key === 'section2') {
      switch (index) {
        case 0:
          this.props.push('ScanPage');
          break;
        case 1:
          this.props.showToast('更多');
          break;
        default:
          break;
      }
    }
  }

  /**
   * 消息
   */
  jumpToMsgPage = () => {
    this.props.push('MessagePage');
  }

  /**
   * 登录
   */
  jumpToLoginPage = () => {
    this.props.push('LoginPage');
  }
}

/**
 * 由于此外导航特殊，不使用NavBar组件，自定义
 * @param {} props 
 */
const NavBar = (props) => {
  const { opacity } = props;
  let navBarViewOpacity = opacity.interpolate({ inputRange: [0, 0.99, 1], outputRange: [0, 0, 1] });
  return (
    <Animated.View style={[styles.navBar, { opacity }]}>
      <EnhanceStatusBar backgroundColor={'#FB4950'} />
      <Animated.View style={[styles.navBarView, { opacity: navBarViewOpacity }]}>
        <SvgUri style={{ marginRight: getSize(10) }} width={30} height={30} source={'icon_smile'} />
        <Text style={{ fontSize: getSize(12), color: '#FFFFFF' }} numberOfLines={1} adjustsFontSizeToFit={false} allowFontScaling={true}>{`请登录`}</Text>
      </Animated.View>
    </Animated.View>
  )
}

const ListHeaderView = (props) => {
  const { onLogin } = props;
  return (
    <Animated.View style={styles.ListHeaderView}>
      <TouchableOpacity style={styles.ListHeaderViewTouchable} activeOpacity={1} onPress={onLogin}>
        <SvgUri style={{ marginRight: getSize(10) }} width={50} height={50} source={'icon_smile'} />
        <Text style={{ fontSize: getSize(16), color: '#FFFFFF' }} numberOfLines={1} adjustsFontSizeToFit={false} allowFontScaling={true}>{`请登录`}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const ListFooterView = (props) => {
  return <View style={{ width: Const.SCREEN_WIDTH, height: getSize(20) }} />
}

/**
 * 按钮行
 * @param {*} props 
 */
const MineButtonsCell = (props) => {
  const { item, index, onPress } = props;
  return (
    <View style={styles.mineButtonsCell}>
      {item.data.map((child, index) => <EnhanceButton key={`Button${index}`} style={{ flex: 1, paddingVertical: getSize(10) }}
        margin={{ top: getSize(5) }} icon={{ source: child.icon }} title={child.text} onPress={() => onPress(index)} />)}
    </View>
  )
}

/**
 * 箭头行
 * @param {*} props 
 */
const MineArrowItemCell = (props) => {
  const { item, index, onPress } = props;
  const firstIndex = 0;
  const lastIndex = SECTION_LIST_DATA[item.key.slice(item.key.length - 1)].data.length - 1;
  const borderTop = index === firstIndex ? { borderTopColor: Const.LINE_COLOR, borderTopWidth: Const.LINE_WIDTH } : {}; //是否显示Cell的顶部边框
  const borderBottom = index === lastIndex ? { borderBottomColor: Const.LINE_COLOR, borderBottomWidth: index === lastIndex ? Const.LINE_WIDTH : 0 } : {}; //是否显示Cell的底部边框
  return (
    <View>
      {index === 0 ? <View style={{ height: getSize(10), width: Const.SCREEN_WIDTH }} /> : null}
      <TouchableOpacity style={[styles.mineArrowItemCell, borderTop, borderBottom]} onPress={onPress} >
        <SvgUri width={getSize(24)} height={getSize(24)} source={item.icon} />
        <Text style={{ flex: 1, marginHorizontal: getSize(10) }}>{item.text}</Text>
        <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_right_arrow'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Const.MAIN_COLOR,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  maskView: {
    position: 'absolute',
    top: 0,
    width: Const.SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    backgroundColor: '#FB4950',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    width: Const.SCREEN_WIDTH,
    height: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT,
    backgroundColor: '#FB4950',
  },
  navBarView: {
    paddingHorizontal: getSize(10),
    height: Const.NAVBAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FB4950'
  },
  navBarSvg: {
    position: 'absolute',
    top: Const.STATUSBAR_HEIGHT + getSize(10),
    right: 0,
    marginRight: getSize(10)
  },
  ListHeaderView: {
    width: Const.SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    backgroundColor: '#FB4950'
  },
  ListHeaderViewTouchable: {
    position: 'absolute',
    left: getSize(20),
    bottom: getSize(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mineButtonsCell: {
    backgroundColor: '#FFFFFF',
    width: Const.SCREEN_WIDTH,
    borderBottomColor: Const.LINE_COLOR,
    borderBottomWidth: Const.LINE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mineArrowItemCell: {
    backgroundColor: '#FFFFFF',
    paddingVertical: getSize(12),
    paddingLeft: getSize(20),
    paddingRight: getSize(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});