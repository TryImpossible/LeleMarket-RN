import React, { useRef, useCallback, useEffect, useImperativeHandle } from 'react';
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

export interface AgentWebHandles {
  /**
   * Go back one page in the webview's history.
   */
  goBack: () => void;

  /**
   * Go forward one page in the webview's history.
   */
  goForward: () => void;

  /**
   * Reloads the current page.
   */
  reload: () => void;

  /**
   * Stop loading the current page.
   */
  stopLoading(): void;

  /**
   * Extra Native Component Config.
   */
  extraNativeComponentConfig: () => any;

  /**
   * Executes the JavaScript string.
   */
  injectJavaScript: (script: string) => void;

  /**
   * Focuses on WebView redered page.
   */
  requestFocus: () => void;

  /**
   * Posts a message to WebView.
   */
  postMessage: (message: string) => void;

  /**
   * (Android only)
   * Removes the autocomplete popup from the currently focused form field, if present.
   */
  clearFormData: () => void;

  /**
   * (Android only)
   * Clears the resource cache. Note that the cache is per-application, so this will clear the cache for all WebViews used.
   */
  clearCache: (clear: boolean) => void;

  /**
   * (Android only)
   * Tells this WebView to clear its internal back/forward list.
   */
  clearHistory: () => void;

  register: (command: string, fn: Function) => void;

  unregister: (command: string) => void;

  call: ({
    command,
    data,
    callback,
  }: {
    command: string;
    data: object;
    callback: { progress?: Function; success?: Function; fail?: Function };
  }) => Promise<object>;
}

export interface AgentWebProps extends WebViewProps {
  indicator?: boolean;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const AgentWeb = React.forwardRef<AgentWebHandles, AgentWebProps>(
  ({ style, indicator, indicatorStyle, injectedJavaScript, onMessage, onLoadProgress, ...restProps }, ref) => {
    const viewLayoutRef = useRef<LayoutRectangle>();
    const { opacity: opacityValue, width: widthValue } = useRef({
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
    }).current;
    const webviewRef = useRef<WebView>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          goBack: () => {
            webviewRef.current?.goBack();
          },
          goForward: () => {
            webviewRef.current?.goForward();
          },
          reload: () => {
            webviewRef.current?.reload();
          },
          stopLoading: () => {
            webviewRef.current?.stopLoading();
          },
          extraNativeComponentConfig: () => {
            webviewRef.current?.extraNativeComponentConfig();
          },
          injectJavaScript: (script: string) => {
            webviewRef.current?.injectJavaScript(script);
          },
          requestFocus: () => {
            webviewRef.current?.requestFocus();
          },
          postMessage: (message: string) => {
            webviewRef.current?.postMessage(message);
          },
          clearFormData: () => {
            webviewRef.current?.clearFormData();
          },
          clearCache: (clear: boolean) => {
            webviewRef.current?.clearCache(clear);
          },
          clearHistory: () => {
            webviewRef.current?.clearHistory();
          },
          register: (command: string, fn: Function) => {
            invoker.register(command, fn);
          },
          unregister: (command: string) => {
            invoker.unregister(command);
          },
          call: ({ command, data, callback }) => {
            return invoker.call({ command, data, callback });
          },
        };
      },
      [],
    );

    useEffect(() => {
      invoker.setup(webviewRef);
    }, []);

    const _renderError = useCallback(() => {
      return (
        <TouchableOpacity style={styles.errorView} activeOpacity={1} onPress={() => webviewRef.current?.reload()}>
          <Label>出错啦！点击空白处刷新 ~</Label>
        </TouchableOpacity>
      );
    }, []);

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
          ref={webviewRef}
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
          source={{ uri: 'http://192.168.1.101:8081/src/components/common/AgentWeb/test.html' }} // NOTE: debug
          // onLoadEnd={async () => {
          //   const result = await setTimeout(async () => {
          //     invoker.call({
          //       command: 'fetch',
          //       callback: {
          //         success: (payload) => {
          //           console.warn('res is ', payload);
          //         },
          //         progress: (p) => {
          //           console.warn('p is', p);
          //         },
          //       },
          //     });
          //     console.warn('result is ', result);
          //   }, 2000);
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
