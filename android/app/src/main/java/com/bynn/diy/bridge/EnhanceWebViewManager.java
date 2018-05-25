package com.bynn.diy.bridge;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.webview.ReactWebViewManager;
import android.webkit.WebView;

public class EnhanceWebViewManager extends ReactWebViewManager {

    private static final String REACT_CLASS = "RCTEnhanceWebView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        WebView root = super.createViewInstance(reactContext);
        return root;
    }


    @ReactProp(name = "allowFileAccessFromFileURLs")
    public void setAllowFileAccessFromFileURLs(WebView root, boolean allows) {
        root.getSettings().setAllowFileAccessFromFileURLs(allows);
    }

    @ReactProp(name = "autoFocus")
    public void setAutoFocus(WebView root, boolean autoFocus) {
        if (autoFocus) {
            root.requestFocus();
        }
    }
}
