//
//  EnhanceWebViewManager.m
//  DIY
//
//  Created by barry on 2018/4/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "EnhanceWebViewManager.h"
#import <React/RCTBridge.h>

@implementation EnhanceWebViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(hideKeyboardAccessoryView, BOOL)

RCT_REMAP_VIEW_PROPERTY(keyboardDisplayRequiresUserAction, _webView.keyboardDisplayRequiresUserAction, BOOL)

@end
