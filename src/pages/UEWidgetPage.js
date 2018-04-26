import React from 'react';

import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, WebView } from 'react-native';

import BasePage from './BasePage';

import LoadingView from '../widgets/LoadingView';

import Banner from '../widgets/Banner';

import CardView from '../widgets/CardView';

import Toast from '../widgets/Toast';

import Scene from '../widgets/Scene';

import { BoxShadow } from 'react-native-shadow'

import EnhanceImage from '../widgets/EnhanceImage';

export default class UEWidgetPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT, backgroundColor: Const.MAIN_COLOR, justifyContent: 'flex-start', alignItems: 'center' }}>
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
        {/* <EnhanceImage style={{ width: getSize(80), height: getSize(80) }} resizeMode={'cover'}
          source={{ uri: 'https://api.51app.cn/resource/diymall/wp/findList/907cb1af.gif' }}
          onLoad={(event) => {
            console.log(event.nativeEvent);
          }} /> */}
        <CardView style={{ flex: 1, marginTop: getSize(30 ) }} width={Const.SCREEN_WIDTH - getSize(100)} height={getSize(150)} borderRadius={getSize(20)}/>
      </View>
    )
  }
}

const ShadowView = (props) => {
  const shadowOpt = {
    width: 50,
    height: 50,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.5,
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