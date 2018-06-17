import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import WithCloseHOC from '../../widgets/HOC/WithCloseHOC';

const WidthCloseTextInput = WithCloseHOC(TextInput);

export default class LoginPage extends BasePage {

  constructor(props) {
    super(props);
    this.path1 = new Animated.Value(0.3);
    this.path2 = new Animated.Value(0.3);
    this.state = {
      mobile: '',
      smscode: ''
    }
  }

  onCreate() {

  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT, justifyContent: 'flex-start', alignItems: 'center' }}>
        <NavBar leftIcon={'icon_close'} title={''} showBottomLine={false} />
        <SvgUri width={65} height={65} source={'icon_smile'} />
        <Text style={{ marginTop: getSize(15), marginBottom: getSize(30), fontSize: getSize(15), color: '#5b4c4c' }}>{'未登录'}</Text>
        <View style={styles.textInputBlock}>
          <SvgUri width={25} height={30} source={'icon_mobile'} />
          <View style={styles.textInputContainer}>
            <Text style={{ fontSize: getSize(15), color: '#bab4b4' }}> +86 </Text>
            <WidthCloseTextInput underlineColorAndroid={'transparent'} style={{ padding: 0, marginHorizontal: getSize(10), flex: 1, color: '#8a7f7f' }} placeholder={'输入手机号'} value={this.state.mobile} />
          </View>
        </View>
        <View style={styles.textInputBlock}>
          <SvgUri width={25} height={30} source={'icon_email'} />
          <View style={styles.textInputContainer}>
            <WidthCloseTextInput underlineColorAndroid={'transparent'} style={{ flex: 1, padding: 0, marginRight: getSize(10), color: '#8a7f7f' }} placeholder={'短信验证码'} value={this.state.smscode} />
            <Animated.View style={{ opacity: this.path1 }}>
              <TouchableOpacity style={styles.sendCodeButton} activeOpacity={Const.ACTIVE_OPACITY} onPress={() => { }}>
                <Text style={{ color: '#fff', fontSize: getSize(13) }}>发送验证码</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        <Animated.View style={{ opacity: this.path2 }}>
          <TouchableOpacity style={styles.loginButton} activeOpacity={Const.ACTIVE_OPACITY} >
            <Text style={{ fontSize: getSize(14), color: '#fff' }}>{`登录`}</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={{ flex: 1 }} />
        <FastLoginComponent />
      </ScrollView>
    )
  }
}

/**
 * 一键登录
 * @param {*} props 
 */
const FastLoginComponent = props => {
  return (
    <View style={styles.fastLoginComponent}>
      <Text style={styles.fastLoginComponentText}>一键登录</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: getSize(15) }}>
        <TouchableOpacity style={[styles.fastLoginComponentButton, { marginRight: getSize(10) }]} activeOpacity={Const.ACTIVE_OPACITY} >
          <SvgUri width={50} height={50} source={'icon_wechat'} />
          <Text style={styles.fastLoginComponentText}>微信</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fastLoginComponentButton, { marginLeft: getSize(10) }]} activeOpacity={Const.ACTIVE_OPACITY} >
          <SvgUri width={50} height={50} source={'icon_qq'} />
          <Text style={[styles.fastLoginComponentText, { marginTop: getSize(3) }]}>QQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputBlock: {
    width: getSize(315),
    height: getSize(44),
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInputContainer: {
    marginLeft: getSize(10),
    flex: 1,
    height: getSize(35),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor:
    Const.LINE_COLOR,
    borderBottomWidth: Const.LINE_WIDTH
  },
  sendCodeButton: {
    marginLeft: getSize(10),
    backgroundColor: '#fe3f56',
    borderRadius: getSize(3),
    padding: getSize(6),
    justifyContent: 'center',
    alignItems: 'center' 
  },
  loginButton: { 
    marginTop: getSize(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: getSize(315),
    height: getSize(44),
    borderRadius: getSize(5),
    backgroundColor: '#fe3f56'
  },
  fastLoginComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getSize(110)
  },
  fastLoginComponentText: {
    fontSize: getSize(14),
    color: '#444444'
  },
  fastLoginComponentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: getSize(80),
    minHeight: getSize(80),
  }

});
