import React from 'react';

import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

export default class LoginPage extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  onCreate() {

  }

  render() {
    const { navTitle = 'DIYWebView', ...otherProps } = this.getProps();
    return (
      <View style={styles.container}>
        <NavBar leftIcon={} title={''} />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
});
