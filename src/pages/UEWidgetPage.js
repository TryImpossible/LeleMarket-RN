import React from 'react';

import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, WebView, Image, TextInput } from 'react-native';

import BasePage from './BasePage';

import LoadingView from '../widgets/LoadingView';

// import Banner from '../widgets/Banner';

import CardView from '../widgets/CardView';

import Toast from '../widgets/Toast';

import Scene from '../widgets/Scene';

import { BoxShadow } from 'react-native-shadow'

import EnhanceImage from '../widgets/EnhanceImage';

import FastImage from 'react-native-fast-image';

import LoadingComponent from '../widgets/LoadingComponent'

import BadgeView from '../widgets/BadgeView';

import ScrollableTabView from '../widgets/scrollableTabView';

import { SimpleBanner, Banner } from '../widgets/banner/index';

import Indicater from '../widgets/banner/Indicater';

import EnhanceWebView from '../widgets/webview';

//测试数据
const BANNER = [
  "https://api.51app.cn/resource/diymall/uu20/special/752ced27.png",
  "https://api.51app.cn/resource/diymall/uu20/special/eaa696ae.png",
  "https://api.51app.cn/resource/diymall/uu20/special/66991c45.png"
];

export default class UEWidgetPage extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
      uri: 'https://t.app.goodiber.com/iber/wxapp-qrcode?iberId=f2d9fb8ca1d411e7a6e06c92bf28e3c5&1526285527848&' + new Date().getTime(), //圖片遠程地址
    }
    // console.warn('StatusBar.currentHeight', StatusBar.currentHeight);
  }

  render() {
    const pageSource = { uri: 'http://192.168.0.13:8081/richEditor/editor.html' };
    // const pageSource = { uri: 'https://www.baidu.com/' };
    return (
      <View style={{ width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT, backgroundColor: Const.MAIN_COLOR, justifyContent: 'center', alignItems: 'center', marginTop: Const.STATUSBAR_HEIGHT, height: Const.SCREEN_HEIGHT - Const.STATUSBAR_HEIGHT }}>

        <EnhanceWebView
          ref={ref => this.webView = ref}
          style={{ flex: 1, width: Const.SCREEN_WIDTH  }}
          source={pageSource}
          keyboardDisplayRequiresUserAction={false}
          // injectedJavaScript={'alert(123)'}
          automaticallyAdjustContentInsets={false}
          autoFocus={true}
          allowFileAccessFromFileURLs={true}
          scalesPageToFit={false}
          mixedContentMode={'always'}
          javaScriptEnabled={true}
          startInLoadingState={true}
          dataDetectorTypes='none'
          onMessage={event => {
            // let ret = JSON.parse(event.nativeEvent.data);
            // console.log(event.nativeEvent.data);
          }}
          onLoad={() => {

          }} />

        {/* <View style={{ marginVertical: getSize(30), shadowColor: 'green', shadowOpacity: 0.3, shadowOffset: { width: 3, height: 3 }, elevation: 3 }}>
          <Text style={{ textAlign: 'center' }} onPress={() => this.showToast('真听话，奖励下!')}>点我阿</Text>
        </View> */}

        {/* <Text style={{ textAlign: 'center' }} onPress={() => this.showToast('123!', 1000, 'bottom')}>点我阿123</Text> */}

        {/* <ShadowView /> */}

        {/* <LoadingView backgroundColor={'transparent'} show={true} loadingColor={'red'} mask={true}/> */}

        {/* <Banner /> */}

        {/* <CardView /> */}

        {/* <Toast /> */}

        {/* <View style={{ width: getSize(50), height: getSize(50), backgroundColor: 'blue' }}>
          <View style={{ width: getSize(30), height: getSize(30), backgroundColor: 'red' }}>
            <View style={{ width: getSize(40), height: getSize(40), backgroundColor: 'green' }} />
          </View>
        </View> */}

        {/* <Scene /> */}

        {/* <EnhanceImage style={{ width: getSize(200), height: getSize(80) }} resizeMode={'cover'}
          source={{ uri: 'https://api.51app.cn/resource/diymall/wp/findList/907cb1af.gif' }}
          // source={{ uri: 'http://f8.topitme.com/8/25/80/1125177570eea80258o.jpg' }}
          // source={{ uri: this.state.uri }}
          onLoad={(event) => {
            // console.log(event.nativeEvent);
          }}
          loadingComponent={<LoadingComponent visible={true} backgroundColor={'transparent'} size={'large'} loadingColor={'green'} />}
          failComponent={<Text>重新加載</Text>}
          allowTimeout={false}
          // onRetry={() => {
          //   this.setState({
          //     uri: this.state.uri.substring(0, this.state.uri.lastIndexOf('&')) + "&" + new Date().getTime(),
          //   });
          // }}
           /> */}

        {/* <CardView style={{ flex: 1, marginTop: getSize(30 ) }} width={Const.SCREEN_WIDTH - getSize(100)} height={getSize(150)} borderRadius={getSize(20)}/> */}

        {/* <BadgeView ref={ref => this.badgeView = ref}>
          <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
        </BadgeView> */}

        {/* <TextInput style={{ width: Const.SCREEN_WIDTH, height: getSize(44) }} /> */}

        {/* <ScrollableTabView
          style={{ height: Const.SCREEN_HEIGHT - Const.STATUSBAR_HEIGHT }}
          tabs={tabs}
          // renderTabBar={() => {
          //   return (
          //     tabs.map((item, index) => <Text>{item}</Text> )
          //   )
          // }}
          >
          {
            tabs.map((item, index) => {
              return (
                <View key={`ScrollableView${index}`} style={{ width: Const.SCREEN_WIDTH, backgroundColor: getRandomColor(), justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{item}</Text>
                </View>
              )
            })
          }
        </ScrollableTabView> */}

        {/* <SimpleBanner /> */}

        {/* <Banner
          respondChildEvent={isResponse => {
            this.canResponseChildEvent = isResponse;
          }}>
          {
            BANNER.map((item, index) => {
              return (
                <TouchableOpacity key={`${index}`} activeOpacity={1} onPress={() => { 
                  console.log('onPress');
                  this.canResponseChildEvent && this.showToast(`点击了${index}`);
                }} >
                  <Image style={{ width: Const.SCREEN_WIDTH, height: getSize(150) }} source={{ uri: item }} />
                </TouchableOpacity>
              )
            })
          }
        </Banner> */}

        {/* <Indicater /> */}

      </View >
    )
  }
}

const tabs = ['劉備', '诸葛亮', '关羽', '张飞', '马超', '黄忠', '赵云', '許褚', '夏侯惇', '於禁', '黃蓋', '甘寧', '周瑜'];

/**
  * 獲取随机颜色，一般调试使用 
  */
const getRandomColor = () => {

  // return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6); //有坑
  // return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); //有坑 

  // let r = Math.floor(Math.random() * 256);
  // let g = Math.floor(Math.random() * 256);
  // let b = Math.floor(Math.random() * 256);
  // return `rgb(${r},${g},${b})`;

  //颜色字符串  
  var colorStr = "#";
  //字符串的每一字符的范围  
  var randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  //产生一个六位的字符串  
  for (var i = 0; i < 6; i++) {
    //15是范围上限，0是范围下限，两个函数保证产生出来的随机数是整数  
    colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
  }
  return colorStr;
}

const ShadowView = (props) => {
  const shadowOpt = {
    width: 50,
    height: 50,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 5,
    y: 5,
    style: { marginVertical: 5, justifyContent: 'center', alignItems: 'center' }
  }
  return (
    <BoxShadow setting={shadowOpt}>
      <View style={{ width: getSize(50), height: getSize(50), backgroundColor: 'green' }} />
    </BoxShadow>
  )
}