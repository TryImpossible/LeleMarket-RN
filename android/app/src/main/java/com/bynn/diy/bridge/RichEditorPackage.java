package com.bynn.diy.bridge;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by barry on 2018/4/17.
 */

public class RichEditorPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RichEditorModule(reactContext));
        return modules;
//        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
//        return Collections.emptyList();
        List<ViewManager> managers = new ArrayList<>();
        managers.add(new RichEditorManager());
        return managers;
    }
}
