'use strict';

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

class Mine extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Mine</Text>
      </View>
    );
  }
}
export default Mine;
