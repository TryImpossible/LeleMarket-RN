'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BaseScreen } from '../../components';
import MainTabNavigator from '../../navigators/MainTabNavigator';

class Main extends PureComponent {
  static router = MainTabNavigator.router;

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {};

  componentDidMount() {
    console.log(this.main); // eslint-disable-line
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseScreen forceInset={{ bottom: 'never', top: 'never' }}>
        <MainTabNavigator
          ref={ref => {
            this.navigator = ref;
          }}
          navigation={navigation}
        />
      </BaseScreen>
    );
  }
}
export default Main;
