## android

- `sudo lsof -i tcp:8081`  查找端口占用的进程
- `sudo kill -9 26467`  杀死进程

- `emulator -list-avds` 查看模拟器列表
- `~/Library/Android/sdk/tools/emulator -avd Pixel_XL_API_28` 启动模拟器

- `adb tcpip 5555` adb 无线连接，打开端口号
- `adb connect 192.168.0.101:5555` adb 无线连接，设备名称: 端口号
- `adb disconnnect 192.168.0.101:5555` adb 无线连接，断开 连接

- `adb shell su -c setprop service.adb.tcp.port 5555` root 环境下，开启无线连接
- `adb shell stop adbd`
- `adb shell start adbd`

- `adb shell input keyevent 82` 打开调试菜单

- `keytool -genkey -alias rndiy.keystore -keyalg RSA -validity 20000 -keystore rndiy.keystore` 生成签名文件
- `keytool -importkeystore -srckeystore rndiy.keystore -destkeystore rndiy.keystore -deststoretype pkcs12` 转换成 JKS 格式签名文件

- `keytool -list -v -keystore donkor.jks` 查看 SHA1 和 MD5 值

- `adb shell am start -S -n chat.secret.media/com.cloudchat.chat.activity.SplashActivity` 启动 app

- `adb shell am start -D -n chat.secret.media/com.cloudchat.chat.activity.SplashActivity`  调试 app

- `adb shell am start -n com.android.launcher3/com.android.launcher3.Launcher` 回到桌面

- `adb shell -c reboot` 重启

- `adb shell reboot -p` 关机

- `./gradlew installDebug` 安装 Debug 包

- `./gradlew installRelease` 安装 Release 包

- `./gradlew assembleDebug` 构建 Debug 包

- `./gradlew assembleRelease` 构建 Release 包

- `react-native run-android --variant=release` 直接安装 Release 包

## ios

- `xcrun instruments -s` 查看安装的模拟器
- `xcrun instruments -w "iPhone X (12.1)"` 启动模拟器
- `xcrun simctl install booted <app 路径>` 安装指定应用
- `xcrun simctl launch booted <app identifier>` 运行指定的 app
- `xcrun simctl uninstall booted <app identifier>` 卸载指定的应用

- `open rndiy.xcworkspace/` 打开工程

- `pod install --verbose --no-repo-update`
- `pod update --verbose --no-repo-update`

## reactnative

- `react-native init` 初始化工程

- `react-native run-ios --port 8081` 启动 node 和 iphone 模拟器

- `react-native run-ios --port 8081` 启动 node 和 anroid 模拟器

- `react-native start` 启动 node 服务

- ```
  rm -r ~/Library/Caches/com.facebook.ReactNativeBuild
  rm -r ./node_modules/react-native/third_party

  cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
  cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
  ```
