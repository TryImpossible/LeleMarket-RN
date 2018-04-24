package com.bynn.diy.bridge;

import android.app.Activity;
import android.content.Intent;

import com.bynn.diy.RichEditorActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by barry on 2018/4/17.
 */

public class RichEditorModule extends ReactContextBaseJavaModule {

    private static final String NATIVE_MODULE = "RichEditorModule";

    private static final int RICH_EDITOR_REQUEST_CODE = 666;

    private static final String ACTIVITY_DOES_NOT_EXIST = "ACTIVITY_DOES_NOT_EXIST";
    private static final String FAILED_TO_SHOW_RICH_EDITOR = "FAILED_TO_SHOW_RICH_EDITOR";

    private Promise mPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == RICH_EDITOR_REQUEST_CODE) {
                if (mPromise != null) {
                    if (resultCode == RICH_EDITOR_REQUEST_CODE) {
                        String html = intent.getStringExtra("html");
                        mPromise.resolve(html);
                    }
                    mPromise = null;
                }
            }
        }
    };

    private final LifecycleEventListener mLiefcycleEventListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {

        }

        @Override
        public void onHostPause() {

        }

        @Override
        public void onHostDestroy() {

        }
    };

    public RichEditorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
        reactContext.addLifecycleEventListener(mLiefcycleEventListener);
    }

    @Override
    public String getName() {
        return NATIVE_MODULE;
    }

    @ReactMethod
    public void show(Promise promise) {

        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "\"Activity doesn't exist\"");
        }

        this.mPromise = promise;

        try {
            Intent intent = new Intent(getCurrentActivity(), RichEditorActivity.class);
            currentActivity.startActivityForResult(intent, RICH_EDITOR_REQUEST_CODE);
        } catch (Exception e) {
            this.mPromise.reject(FAILED_TO_SHOW_RICH_EDITOR, e);
            this.mPromise = null;
        }

    }
}
