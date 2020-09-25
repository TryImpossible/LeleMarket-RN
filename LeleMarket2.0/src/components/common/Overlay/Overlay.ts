import React from 'react';
import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';
import OverlayStackView from './OverlayStackView';
import OverlayPopoverView from './OverlayPopoverView';

class Overlay {
  static View = OverlayView;
  static PullView = OverlayPullView;
  static PopView = OverlayPopView;
  static StackView = OverlayStackView;
  static PopoverView = OverlayPopoverView;

  static show(overlayView) {
    const element = React.cloneElement(overlayView, {
      display: true,
      onDismissCompleted: () => {
        global._windowRef.current?.dismiss();
      },
    });
    global._windowRef.current?.show(element);
  }

  static dismiss() {
    global._windowRef.current?.dismiss();
  }
}

global.Overlay = Overlay;

export default Overlay;
