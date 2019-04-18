import React from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  ScrollView,
  WebView,
  PixelRatio
} from "react-native";

import BasePage from "../BasePage";

import PropTypes from "prop-types";

import { RNCamera } from "react-native-camera";

import SvgUri from "../../dependencies/react-native-svg-uri";

import EnhanceStatusBar from "../../widgets/EnhanceStatusBar";

import NavBar from "../../widgets/NavBar";

/**
 * 扫描区域位置
 */
const SacningLayout = () => {
  const pageX = getSize(58);
  const pageY = Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT + getSize(134);
  const width = Const.SCREEN_WIDTH - getSize(58) * 2;
  const height = Const.SCREEN_HEIGHT - pageY - getSize(134) - getSize(80);
  return { pageX, pageY, width, height };
};

export default class ScanPage extends BasePage {
  constructor(props) {
    super(props);
    this.path = new Animated.Value(getSize(134));
    this.state = {
      result: ""
    };
  }

  render() {
    if (__ANDROID__) return <View style={{ flex: 1 }} />;
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        style={{ width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT }}
        contentContainerStyle={{
          width: Const.SCREEN_WIDTH * 2,
          height: Const.SCREEN_HEIGHT
        }}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        scrollEnabled={false}
      >
        {Array(2)
          .fill("Scan")
          .map((item, index) => {
            if (index === 0) {
              return this.renderScan();
            } else {
              return this.renderResult();
            }
          })}
      </ScrollView>
    );
  }

  transformHtml(content) {
    return `<!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>Link App</title>
      <style>
      </style>
    </head>
    <body>
      <div>${content}</div>
    </body>
    </html>`;
  }

  isNetAddress(url) {
    return /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(
      url
    );
  }

  renderResult() {
    const props = !this.state.result
      ? {}
      : this.isNetAddress(this.state.result)
      ? { source: { uri: this.state.result } }
      : {
          source: { html: this.transformHtml(this.state.result), baseUrl: "" }
        };
    return (
      <View
        key={`ScanResult`}
        style={{
          width: Const.SCREEN_WIDTH,
          height: Const.SCREEN_HEIGHT,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <NavBar />
        <WebView
          ref={ref => (this.webView = ref)}
          style={{ backgroundColor: "#ffffff", width: Const.SCREEN_WIDTH }}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          saveFormDataDisabled={true}
          dataDetectorTypes="all"
          startInLoadingState={true}
          {...props}
        />
      </View>
    );
  }

  renderScan() {
    return (
      <RNCamera
        key={`ScanPending`}
        ref={ref => (this.camera = ref)}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.auto}
        // zoom={0.5}
        // focusDepth={0.5}
        // barCodeTypes={[RNCamera.Constants.BarCodeType.qr]} //指定Bar的类型，二维码、条形码之类的
        onBarCodeRead={this._onBarCodeRead}
        onCameraReady={() => {
          this.paly();
        }}
        onMountError={() => {}}
        onTextRecognized={() => {
          return 12312;
        }}
        permissionDialogTitle={"相机权限"}
        permissionDialogMessage={"DIY 想使用你的相机"}
      >
        <EnhanceStatusBar backgroundColor={"rgba(0,0,0,0.3)"} />
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            width: Const.SCREEN_WIDTH,
            height: Const.NAVBAR_HEIGHT,
            paddingHorizontal: getSize(10),
            height: Const.NAVBAR_HEIGHT,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          activeOpacity={1}
          onPress={() => this.pop()}
        >
          <SvgUri
            width={getSize(24)}
            height={getSize(24)}
            source={"icon_nav_bar_back"}
            fill={"#ffffff"}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Const.SCREEN_WIDTH,
            height: Const.PAGE_HEIGHT - getSize(80)
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: Const.SCREEN_WIDTH,
              height: getSize(134),
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: Const.SCREEN_WIDTH,
              height: getSize(134),
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
          />
          <View
            style={{
              position: "absolute",
              top: getSize(134),
              left: 0,
              width: getSize(58),
              height: Const.PAGE_HEIGHT - getSize(80) - getSize(134) * 2,
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
          />
          <View
            style={{
              position: "absolute",
              top: getSize(134),
              right: 0,
              width: getSize(58),
              height: Const.PAGE_HEIGHT - getSize(80) - getSize(134) * 2,
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: this.path,
              left: getSize(58),
              right: getSize(58),
              height: getSize(3),
              backgroundColor: "#f93a54"
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,1)",
            width: Const.SCREEN_WIDTH,
            height: getSize(80),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={{}}>
            <Text style={{ fontSize: 16, color: "#f93a54" }}> 扫码 </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  }

  paly() {
    Animated.timing(this.path, {
      toValue: Const.PAGE_HEIGHT - getSize(80) - getSize(134),
      easing: Easing.linear,
      duration: 2000
    }).start(() => {
      Animated.timing(this.path, {
        toValue: getSize(134),
        easing: Easing.linear,
        duration: 2000
      }).start(() => !this.state.result && this.paly());
    });
  }

  _onBarCodeRead = event => {
    const { data, bounds } = event;
    let x = 0,
      y = 0; //位置

    if (__IOS__) {
      const { origin } = bounds;
      x = Number(origin.x);
      y = Number(origin.y);
    } else if (__ANDROID__) {
      console.warn(bounds);
      if (
        !bounds ||
        !bounds[0] ||
        !bounds[0].x ||
        !bounds[0].y ||
        !bounds[1] ||
        !bounds[1].x ||
        !bounds[1].y ||
        !bounds[2] ||
        !bounds[2].x ||
        !bounds[2].y ||
        !bounds[3] ||
        !bounds[3].x ||
        !bounds[3].y
      )
        return null;
      const pixelRatio = PixelRatio.get();
      const leftBottom = {
        x: bounds[0].x / pixelRatio,
        y: bounds[0].y / pixelRatio
      };
      const leftTop = {
        x: bounds[1].x / pixelRatio,
        y: bounds[1].y / pixelRatio
      };
      const rightTop = {
        x: bounds[2].x / pixelRatio,
        y: bounds[2].y / pixelRatio
      };
      const rightBottom = {
        x: bounds[3].x / pixelRatio,
        y: bounds[3].y / pixelRatio
      };
      x = Math.min(leftTop.x, leftBottom.x);
      y = Math.min(leftTop.y, rightTop.y);
    }
    const { pageX, pageY, width, height } = SacningLayout();
    let minX = pageX,
      minY = pageY,
      maxX = pageX + width,
      maxY = pageY + height;
    if (x > minX && y > minY && (x < maxX && y < maxY)) {
      this.setState(
        {
          result: data
        },
        () => {
          this.scrollView &&
            this.scrollView.scrollTo({
              x: Const.SCREEN_WIDTH,
              y: 0,
              animated: false
            });
        }
      );
    }
  };

  takePicture = async function() {
    // if (this.camera) {
    //   const options = { quality: 0.5, base64: true };
    //   const data = await this.camera.takePictureAsync(options)
    //   console.log(data.uri);
    // }
  };
}

const styles = StyleSheet.create({
  container: {
    width: Const.SCREEN_WIDTH,
    height: Const.SCREEN_HEIGHT,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
