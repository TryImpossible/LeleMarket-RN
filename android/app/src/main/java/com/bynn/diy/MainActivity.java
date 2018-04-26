package com.bynn.diy;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DIY";
    }
}


//package com.bynn.diy;
//
//import android.app.Activity;
//import android.os.Bundle;
//import android.webkit.WebView;
//
//public class MainActivity extends Activity {
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//        WebView webView = (WebView) findViewById(R.id.webview);
//        webView.loadUrl("https://www.baidu.com/");
//        webView.requestFocus();
//    }
//}