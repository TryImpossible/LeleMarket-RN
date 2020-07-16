import OverlayView from './OverlayView';
import OverlayPullView from './OverlayPullView';
import OverlayPopView from './OverlayPopView';
import OverlayStackView from './OverlayStackView';

class Overlay {
  static View = OverlayView;
  static pullView = OverlayPullView;
  static popView = OverlayPopView;
  static stackView = OverlayStackView;
}

export default Overlay;
