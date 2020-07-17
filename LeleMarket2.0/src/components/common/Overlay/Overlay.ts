import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';
import OverlayStackView from './OverlayStackView';

class Overlay {
  static View = OverlayView;
  static PullView = OverlayPullView;
  static PopView = OverlayPopView;
  static StackView = OverlayStackView;
}

export default Overlay;
