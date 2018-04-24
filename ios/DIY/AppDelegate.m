/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <IQKeyboardManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

#if DEBUG // 判断是否在测试环境下
  if (TARGET_IPHONE_SIMULATOR){
    [[RCTBundleURLProvider sharedSettings] setDefaults];
  }else{
    [[RCTBundleURLProvider sharedSettings] setJsLocation: @"192.168.0.9"];
  }
#else
  // TODO
#endif
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"DIY"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void) configurationThridSDKApplication: (UIApplication *)application options:(NSDictionary *)launchOptions{
  
    //配置键盘,解决输入框
    IQKeyboardManager *boardManager = [IQKeyboardManager sharedManager];
    //开启键盘自动收缩功能
    boardManager.enable = YES;
    //控制点击背景是否收起键盘
    boardManager.shouldResignOnTouchOutside = YES;
    //控制是否显示键盘上的工具条
    boardManager.enableAutoToolbar = NO;
  }
  
@end
