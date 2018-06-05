package com.bynn.diy.bridge;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.webview.ReactWebViewManager;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;

public class EnhanceWebViewManager extends ReactWebViewManager {

    private static final String REACT_CLASS = "RCTEnhanceWebView";

    private Context context;


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        context = reactContext;
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
            InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);
        }
    }
}
