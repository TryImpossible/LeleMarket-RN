import React from 'react';

import { StatusBar, View, FlatList, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';

import BasePage from '../BasePage';

import SvgUri from '../../dependencies/react-native-svg-uri';

import EnhanceStatusBar from '../../widgets/EnhanceStatusBar';

import SimpleBanner from '../../widgets/banner';

import NavBar from '../../widgets/NavBar';

const NavBarTitles = ['商品', '详情', '评价'];

const NavBarPath = new Animated.Value(0);

export default class GoodsDetailPage extends BasePage {

  constructor(props) {
    super(props);
  }

  onCreate() {

  }

  renderCommodity() {
    return (
      <FlatList
        style={[styles.container, { backgroundColor: this.getRandomColor() }]}
        data={['commodify']}
        ListHeaderComponent={() => {
          return null;
        }}
        renderItem={({ item, index }) => {
          return <View style={[styles.container, { backgroundColor: this.getRandomColor() }]} />;
        }}
        keyExtractor={(item, index) => `Commodify${index}`}
        onScroll={({ nativeEvent }) => {
          // console.warn(nativeEvent.contentOffset.y);
          // let scaleratio = 1 - nativeEvent.contentOffset.y / HEADER_HEIGHT; //拉伸比例
          // this.scalePath.setValue(Math.abs(scaleratio));

          let opacityratio = nativeEvent.contentOffset.y / (Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT); //透明度比例, getSize(86)是头像向上滑动消失的偏移量
          NavBarPath.setValue(opacityratio);
          if ( opacityratio >= 0.9 ) {
            StatusBar.setBarStyle('dark-content');
          } else {
            StatusBar.setBarStyle('light-content');
          }
        }} />
    )
  }

  renderDetailInfo() {
    return <View style={[styles.container, { backgroundColor: this.getRandomColor() }]} />;
  }

  renderEvaluate() {
    return <View style={[styles.container, { backgroundColor: this.getRandomColor() }]} />;
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.container}
          data={NavBarTitles}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          renderItem={({ item, index }) => {
            switch (index) {
              case 0:
                return this.renderCommodity();
                break;
              case 1:
                return this.renderDetailInfo();
                break;
              case 2:
                return this.renderEvaluate();
                break;
              default:
                break;
            }
          }}
          keyExtractor={(item, index) => `Main${index}`}
          onScroll={({ nativeEvent }) => {
            console.warn(nativeEvent.contentOffset.x / Const.SCREEN_WIDTH);
          }} />
        <NavBar1 />
      </View>
    )
  }
}

const NavBar1 = props => {
  const { onBack, onSelect, onShare } = props;
  const colorInterpolate = NavBarPath.interpolate({ inputRange: [0, 0.9, 1], outputRange: ['#FFF', '#979797', '#979797'] });
  return (
    <View style={{ position: 'absolute' }}>
      <Animated.View style={{ width: Const.SCREEN_WIDTH, height: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: Const.LINE_COLOR, opacity: NavBarPath }}>
        <EnhanceStatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      </Animated.View>
      <View style={{ ...StyleSheet.absoluteFillObject, top: Const.STATUSBAR_HEIGHT, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minWidth: getSize(44) }} activeOpacity={Const.ACTIVE_OPACITY} >
          <Animated.View>
            <SvgUri width={getSize(24)} height={getSize(24)} fill={'#fff'} source={'icon_nav_bar_back'} />
          </Animated.View>
          <Animated.View style={{ ...StyleSheet.absoluteFillObject, left: getSize(10), opacity: NavBarPath }}>
            <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_nav_bar_back'} />
          </Animated.View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Const.NAVBAR_HEIGHT }}>
          {
            NavBarTitles.map((item, index) => {
              return (
                <TouchableOpacity key={`title${index}`} activeOpacity={Const.ACTIVE_OPACITY} >
                  <Animated.Text style={{ marginRight: getSize(15), color: colorInterpolate, fontSize: getSize(16), fontWeight: '600' }}>{item}</Animated.Text>
                </TouchableOpacity>
              )
            })
          }
          <Animated.View style={{ position: 'absolute', left: 0, bottom: getSize(4), width: getSize(32), height: getSize(2), backgroundColor: colorInterpolate }} />
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minWidth: getSize(44) }} activeOpacity={Const.ACTIVE_OPACITY}>
          <Animated.View>
            <SvgUri width={getSize(24)} height={getSize(24)} fill={'#fff'} source={'icon_nav_bar_share'} />
          </Animated.View>
          <Animated.View style={{ ...StyleSheet.absoluteFillObject, left: getSize(10), opacity: NavBarPath }}>
            <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_nav_bar_share'} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Footer = props => {
  return null;
}

const styles = StyleSheet.create({
  container: {
    width: Const.SCREEN_WIDTH,
    height: Const.SCREEN_HEIGHT
  },
});