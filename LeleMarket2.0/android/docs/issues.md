# 所遇到的问题

## ios 端集成 react-native-config

- 如何在 plist 文件中使用 env 中定义的变量
  - https://github.com/luggit/react-native-config#availability-in-build-settings-and-infoplist
  - https://github.com/luggit/react-native-config/issues/413

## ios 多环境实现

- 采用 Configurations 实现，搭配 xxconfig 使用
- podfile 实现某些依赖只是 Debug 环境使用
- 自定义 Configurations 如何区分 Debug 和 Release，https://guides.cocoapods.org/syntax/podfile.html#project
