package com.bynn.diy;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.bynn.diy.bridge.EnhanceWebViewPackage;
import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;

import com.rnim.rn.audio.ReactNativeAudioPackage;

import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNCameraPackage(),
          new ReactNativeAudioPackage(),
          new RNViewShotPackage(),
          new ReactVideoPackage(),
          new SvgPackage(),
          new RNSpinkitPackage(),
          new PickerPackage(),
          new RNFetchBlobPackage(),
          new FastImageViewPackage(),
          new RNDeviceInfo(),
          new EnhanceWebViewPackage()
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

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
