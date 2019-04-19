'use strict';

import React, { PureComponent } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { SCREEN_WIDTH, TABBAR_HEIGHT, SAFE_BOTTOM_MARGIN } from '../../constants/Const';
import { __IPHONEX__ } from '../../utils';

// const styles = StyleSheet.create({
//   container: {}
// });

class TabBar extends PureComponent {
  static propTypes = {
    // style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array])
  };

  static defaultProps = {};

  componentDidMount() {}

  render() {
    // const { style = {} } = this.props;

    return (
      // <View style={[styles.container, StyleSheet.flatten(style)]}>
      <React.Fragment>
        <View style={{ width: SCREEN_WIDTH, height: TABBAR_HEIGHT, backgroundColor: 'green' }} />
        {__IPHONEX__ && <View style={{ width: SCREEN_WIDTH, height: SAFE_BOTTOM_MARGIN, backgroundColor: 'red' }} />}
        {/* </View> */}
      </React.Fragment>
    );
  }
}

export default TabBar;
