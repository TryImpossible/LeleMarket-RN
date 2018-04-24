package com.bynn.diy.bridge;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.webview.ReactWebViewManager;

/**
 * Created by barry on 2018/4/22.
 */

public class EnhanceWebViewManager extends ReactWebViewManager {

    private static final String REACT_CLASS = "EnhanceWebView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        WebView webView = super.createViewInstance(reactContext);
        webView.requestFocus();
        return webView;
    }

    @ReactProp(name="autoFocus", defaultBoolean = true)
    public void autoFocus(WebView webView, boolean autoFocus) {
        if (autoFocus) {
            webView.requestFocus();
//            ((InputMethodManager) this.context.getSystemService(
//                this.context.INPUT_METHOD_SERVICE)).toggleSoftInput(0, InputMethodManager.RESULT_SHOWN);
        }
    }
}
