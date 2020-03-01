import React from 'react';

import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import BaseWidget from './BaseWidget';

import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

import LoadingComponent from './LoadingComponent';

/**
 * 擴展Image
 * 1.增加佔位圖功能
 * 2.增加重試機制 
 * 
 *  <EnhanceImage style={{ width: getSize(200), height: getSize(80) }} resizeMode={'cover'}
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
           />
 */
export default class EnhanceImage extends BaseWidget {

  static propTypes = {
    showPlaceholder: PropTypes.bool, //是否顯示佔位圖
    placeholder: PropTypes.number, //占位图，资源ID

    showLoading: PropTypes.bool, //是否顯示加載Loading

    loading: PropTypes.shape({
      size: PropTypes.oneOf(['small', 'large']), //Loading尺寸
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //Loading顏色
    }),
    loadingComponent: PropTypes.element, //Loading組件 

    allowTimeout: PropTypes.bool, //是否開啟超時監測
    timeout: PropTypes.number, // 圖片加載超時

    fail: PropTypes.shape({
      tip: PropTypes.string, //提示文字,
      tipSize: PropTypes.number, //提示文字大小
      tipColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //提示文字顏色
    }),
    failComponent: PropTypes.element, //加載失敗組件 

    onRetry: PropTypes.func, //重試
  }

  static defaultProps = {
    showPlaceholder: true, //默認顯示 
    placeholderUri: require('../resource/DIY.png'), //默认，DIY.png

    showLoading: false,

    loading: {
      size: 'small',
      color: 'grey',
    },

    allowTimeout: false,
    timeout: 3000, //默認3秒超時

    fail: {
      tip: '點擊重試',
      tipSize: getSize(15),
      tipColor: 'red'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showPlaceholder: props.showPlaceholder,
      showLoading: props.showLoading,
      allowTimeout: props.allowTimeout, 
      isFinishLoad: true, //圖片否加成功加載, 默認加載成功
    }
  }

  /**
   * 佔位圖
   */
  renderPlaceHolderImage() {
    const { style, placeholderUri } = this.props;
    const { width = 0, height = 0, borderRadius = 0 } = style; //圖片尺寸
    if (this.state.showPlaceholder) {
      return <FastImage style={{ width, height, borderRadius }}
        resizeMode={'stretch'} source={placeholderUri} />
    } else {
      return null;
    }
  }

  /**
   * Loading組件
   */
  renderLoadingView() {
    const { style, loading, loadingComponent } = this.props;
    const { width = 0, height = 0, borderRadius = 0 } = style;
    if (this.state.showLoading) {
      return loadingComponent || <LoadingComponent style={{ position: 'absolute', width, height, borderRadius, justifyContent: 'center', alignItems: 'center' }}
        visible={true} backgroundColor={'transparent'} size={loading.size} loadingColor={loading.color} />
    } else {
      return null;
    }
  }

  /**
   * 加載失敗組件
   */
  renderFailView() {
    const { style, fail, failComponent } = this.props;
    const { width = 0, height = 0, borderRadius = 0 } = style;
    if (!this.state.isFinishLoad) {
      if (failComponent) {
        return (
          <TouchableOpacity
            style={[styles.absolute, { width, height, borderRadius }, styles.center ]}
            activeOpacity={1}
            onPress={this._onPress}>
            {failComponent}
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity 
            style={[styles.absolute, { width, height, borderRadius }, styles.center ]}
            activeOpacity={1}
            onPress={this._onPress} >
            <Text style={{ backgroundColor: 'transparent', fontSize: fail.tipSize, color: fail.tipColor }}>{fail.tip}</Text>
          </TouchableOpacity>
        )
      }
    } else {
      return null;
    }
  }

  renderFinalImage() {
    const { showPlaceholder, placeholderUri, loading, loadingComponent, allowTimeout, timeout,
      fail, failComponent, onRetry, style = {}, onLoadStart, onLoadEnd, ...otherProps } = this.props;
    // const resizeMode = this.props.resizeMode || FastImage.resizeMode.cover; //图片加载模式
    if (this.state.isFinishLoad) {
      return (
        <FastImage
          {...otherProps}
          style={[style, styles.absolute]}
          // onProgress={(event) => {
          //   console.warn('onProgress');
          //   console.log(event.nativeEvent);
          // }}
          onLoadStart={() => {
            if (this.state.allowTimeout) {
              this.timer = setTimeout(() => this.setState({ isFinishLoad: false, showLoading: false }), timeout);
            }
            onLoadStart && onLoadStart();
          }}
          onLoadEnd={() => {
            if (this.state.allowTimeout) {
              this.setState({ isFinishLoad: true, showLoading: false, showPlaceholder: false });
              this.timer && clearTimeout(this.timer);
            } else {
              this.setState({ showLoading: false, showPlaceholder: false });
            }
            onLoadEnd && onLoadEnd();
          }}
        />
      )
    } else {
      return null;
    }
  }

  render() {
    const { width = 0, height = 0, borderRadius = 0 } = this.props.style || {};
    return (
      <View style={[styles.container, { width, height, borderRadius }]}>
        {this.renderPlaceHolderImage()}
        {this.renderFinalImage()}
        {this.renderLoadingView()}
        {this.renderFailView()}
      </View>
    )
  }

  /**
   * 重試
   */
  _onPress = () => {
    let { allowTimeout, isFinishLoad } = this.state;
    if (allowTimeout && !isFinishLoad) {
      this.setState({
        showLoading: true,
        isFinishLoad: true
      });   
    } 
    this.props.onRetry && this.props.onRetry();
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});