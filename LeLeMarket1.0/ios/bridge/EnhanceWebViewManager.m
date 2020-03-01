//
//  EnhanceWebViewManager.m
//  iber
//
//  Created by barry on 2018/5/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "EnhanceWebViewManager.h"

@implementation EnhanceWebViewManager

RCT_EXPORT_MODULE(RCTEnhanceWebView)

RCT_REMAP_VIEW_PROPERTY(keyboardDisplayRequiresUserAction, _webView.keyboardDisplayRequiresUserAction, BOOL)

@end
