import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  LayoutRectangle,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import Label from '../Label';
import invoker from './invoker';

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.accentColor,
    height: 2,
  },
  errorView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface AgentWebHandles extends WebView {}

export interface AgentWebProps extends WebViewProps {
  indicator?: boolean;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const AgentWeb = React.forwardRef<AgentWebHandles, AgentWebProps>(
  ({ style, indicator, indicatorStyle, injectedJavaScript, onMessage, onLoadProgress, ...restProps }, ref) => {
    invoker.setup(ref);
    const viewLayoutRef = useRef<LayoutRectangle>();
    const { opacity: opacityValue, width: widthValue } = useRef({
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
    }).current;

    const _renderError = useCallback(() => {
      return (
        <TouchableOpacity
          style={styles.errorView}
          activeOpacity={1}
          onPress={() => (ref as React.MutableRefObject<WebView>).current?.reload()}
        >
          <Label>出错啦！点击空白处刷新 ~</Label>
        </TouchableOpacity>
      );
    }, [ref]);

    const _onLoadProgress = useCallback(
      (event) => {
        const {
          nativeEvent: { progress },
        } = event;
        if (indicator && viewLayoutRef.current) {
          Animated.parallel([
            Animated.timing(opacityValue, {
              toValue: progress * 2,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
            Animated.timing(widthValue, {
              toValue: viewLayoutRef.current.width * progress,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: false,
            }),
          ]).start(() => {
            if (progress >= 1) {
              Animated.sequence([
                Animated.timing(opacityValue, {
                  toValue: 0,
                  duration: 350,
                  easing: Easing.ease,
                  useNativeDriver: false,
                }),
                Animated.timing(widthValue, {
                  toValue: 0,
                  duration: 0,
                  useNativeDriver: false,
                }),
              ]).start();
            }
          });
        }
        onLoadProgress && onLoadProgress(event);
      },
      [indicator, onLoadProgress, opacityValue, widthValue],
    );

    return (
      <View
        style={[{ flex: 1 }, style]}
        onLayout={({ nativeEvent: { layout } }) => {
          viewLayoutRef.current = layout;
        }}
      >
        <WebView
          ref={ref}
          allowUniversalAccessFromFileURLs
          allowFileAccess
          geolocationEnabled
          automaticallyAdjustContentInsets={false}
          mediaPlaybackRequiresUserAction
          startInLoadingState
          domStorageEnabled
          javaScriptEnabled
          mixedContentMode="always"
          thirdPartyCookiesEnabled
          allowsInlineMediaPlayback
          dataDetectorTypes="none"
          allowsFullscreenVideo
          cacheEnabled
          renderError={_renderError}
          {...restProps}
          injectedJavaScript={`${invoker.inject()}${injectedJavaScript}`}
          onMessage={(event) => {
            invoker.handler(event);
            onMessage && onMessage(event);
          }}
          onLoadProgress={_onLoadProgress}
          // source={{ uri: 'http://192.168.1.2:8082/src/components/EWebview/test.html' }} // NOTE: debug
          // onLoadEnd={async () => {
          //   const result = await invoker.call({
          //     action: 'hello',
          //     callback: {
          //       success: (res) => {
          //         console.warn('res is ', res);
          //       },
          //     },
          //   });
          //   console.warn('result is ', result);
          // }}
        />
        {indicator && (
          <Animated.View style={[styles.indicator, indicatorStyle, { opacity: opacityValue, width: widthValue }]} />
        )}
      </View>
    );
  },
);

AgentWeb.defaultProps = {
  indicator: true,
};

export default AgentWeb;
export { invoker as AgentWebInvoker };
