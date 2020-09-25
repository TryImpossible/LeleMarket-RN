import _screen from './_screen';
import _navBar from './_navBar';
import _tabBar from './_tabBar';
import _toast from './_toast';
import _button from './_button';
import _form from './_form';
import _loader from './_loader';
import _badge from './_badge';
import styles from './styles';
import * as colors from './colors';
import * as dimens from './dimens';

export default {
  styles: {
    ...styles,
    ScreenLayout: _screen,
    NavBar: _navBar,
    TabBar: _tabBar,
    Toast: _toast,
    Button: _button,
    Form: _form,
    Loader: _loader,
    Badge: _badge,
  },
  colors,
  dimens,
};
