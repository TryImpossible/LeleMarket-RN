import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';

class Overlay {
  static View = OverlayView;
  static pullView = OverlayPullView;
  static popView = OverlayPopView;
}

export default Overlay;
