package com.bynn.diy;

import android.app.Application;
import android.content.Context;

import com.bynn.diy.modules.SystemPackage;
import com.bynn.diy.utils.AppBlockCanaryContext;
import com.bynn.diy.utils.AppUncaughtExceptionHandler;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.moduth.blockcanary.BlockCanary;
import com.horcrux.svg.SvgPackage;
import com.squareup.leakcanary.LeakCanary;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static MainApplication mInstance = null;

  private static Context appContext = null;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGestureHandlerPackage(),
          new SvgPackage(),
          new SystemPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  public static MainApplication getInstance() {
    if (mInstance == null) {
      throw new IllegalStateException("Application is not created.");
    }
    return mInstance;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    appContext = getApplicationContext();
    mInstance = this;
    SoLoader.init(this, /* native exopackage */ false);

    // 异常捕获
    AppUncaughtExceptionHandler crashHandler = AppUncaughtExceptionHandler.getInstance();
    crashHandler.init(getApplicationContext());

    // 卡顿检测
    BlockCanary.install(this, new AppBlockCanaryContext()).start();

    // 内存泄露检测
    if (LeakCanary.isInAnalyzerProcess(this)) {
      // This process is dedicated to LeakCanary for heap analysis.
      // You should not init your app in this process.
      return;
    }
    LeakCanary.install(this);
  }

  public static Context getAppContext() {
    return appContext;
  }
}
