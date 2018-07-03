import React from 'react';

import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

const patchPostMessageFunction = () => {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  window.postMessage = patchedPostMessage;
};
const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

export default class DIYWebViewPage extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onCreate() {

  }

  render() {
    const { navTitle = 'DIYWebView', injectedJavaScript, ...otherProps } = this.getProps();
    return (
      <View style={styles.container}>
        <NavBar title={navTitle} />
        <WebView
          ref={ref => this.webView = ref}
          style={{ backgroundColor: '#fff', width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT - Const.STATUSBAR_HEIGHT - Const.NAVBAR_HEIGHT }}
          injectedJavaScript={`${patchPostMessageJsCode}\n${injectedJavaScript && injectedJavaScript}`}
          allowsInlineMediaPlayback={false} //ios, 指定HTML5视频是在网页当前位置播放还是使用原生的全屏播放器播放, 默认值false
          dataDetectorTypes={'none'} //探测网页中某些特殊数据类型，自动生成可点击的链接 enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all')
          bounces={true}
          domStorageEnabled={true} //Android, 指定是否开启DOM本地存储
          mediaPlaybackRequiresUserAction={true} //设置页面中的HTML5音视频是否需要在用户点击后再开始播放, 默认值true.
          scalesPageToFit={true} //设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例
          scrollEnabled={true}
          mixedContentMode={'always'} //Android, 即WebView是否应该允许安全链接（https）页面中加载非安全链接（http）的内容
          saveFormDataDisabled={true} //Android, 用于控制页面上的表单是否启用自动保存/自动补全功能
          startInLoadingState={true}
          removeClippedSubviews={false}
          source={{ uri: 'https://github.com/TryImpossible' }} //默认地址
          onMessage={(e) => {
            // console.warn(e.nativeEvent.data);
            // let ret = JSON.parse(e.nativeEvent.data);
            // console.warn(ret);
          }}
          {...otherProps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});
