import _screen from './_screen';
import _navBar from './_navBar';
import _tabBar from './_tabBar';
import _toast from './_toast';
import _button from './_button';
import _form from './_form';
import _loader from './_loader';
import _badge from './_badge';
import * as colors from './colors';
import * as dimens from './dimens';

export default {
  ..._screen,
  ..._navBar,
  ..._tabBar,
  ..._toast,
  ..._button,
  ..._form,
  ..._loader,
  ..._badge,
  ...colors,
  ...dimens,
};
