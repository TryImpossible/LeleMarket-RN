import React from 'react';

import { Platform, WebViewProps } from 'react-native';

import BaseComponent from '../BaseComponent';

import PropTypes from 'prop-types';

const WebView = Platform.select({
    ios: () => require('./EnhanceWebView.ios'),
    android: () => require('./EnhanceWebView.android'),
})();

const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;
    const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

export default class EnhanceWebView extends BaseComponent {

    static propTypes = {
        ...WebViewProps,
        getRef: PropTypes.func, //EnhanceWebView实例，由于 ref 不能作为Props, 采用 getRef 代替
        autoFocus: PropTypes.bool, //Android, 是否自動獲取焦點
        keyboardDisplayRequiresUserAction: PropTypes.bool, //ios, 自動獲取焦點
    }

    static defaultProps = {
        autoFocus: true,
        keyboardDisplayRequiresUserAction: true
    }

    render() {
        const { getRef, injectedJavaScript, ...otherProps } = this.props;
        return(
            <WebView 
                ref={ref => getRef && getRef(ref)}
                injectedJavaScript={`${patchPostMessageJsCode}\n${injectedJavaScript}`}
                { ... otherProps }
            />
        ) 
            
    }
}