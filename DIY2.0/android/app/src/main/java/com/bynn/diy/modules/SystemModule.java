package com.bynn.diy.modules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class SystemModule extends ReactContextBaseJavaModule {

    private final String NAME = "SystemModule";

    public SystemModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }
}
